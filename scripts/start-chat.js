#!/usr/bin/env node
/**
 * scripts/start-chat.js
 *
 * Simple Node 18+ CLI that selects a repo persona and sends it as the system prompt to an LLM (OpenAI example).
 *
 * Usage:
 *   OPENAI_API_KEY=... node scripts/start-chat.js "Explain how to add feature X"
 *   node scripts/start-chat.js --persona principal_cloud_architect "Design deployment"
 *   node scripts/start-chat.js --list
 *   node scripts/start-chat.js --interactive
 *
 * Notes:
 * - This example uses OpenAI's chat completions endpoint and requires OPENAI_API_KEY in the environment.
 * - Replace the chat call with your preferred provider if needed.
 */
import fs from "fs";
import path from "path";
import readline from "readline";

const PERSONA_DIR = path.resolve(".copilot", "personas");
const CONFIG_PATH = path.resolve(".copilot", "config.yaml");
const SINGLE_PERSONA_FALLBACK = path.resolve(".copilot", "persona.yaml");

function readFileIfExists(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

function parseSimpleYaml(yamlText) {
  if (!yamlText) return {};
  const lines = yamlText.split(/\\r?\\n/);
  const out = {};
  let currentKey = null;
  for (let raw of lines) {
    const line = raw.trimEnd();
    if (!line || line.startsWith("#")) continue;
    const kv = line.match(/^([^:]+):\\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1].trim();
    const rest = kv[2].trim();
    if (rest === "") {
      currentKey = key;
      out[currentKey] = {};
      continue;
    }
    if (currentKey && line.startsWith("  ")) {
      const m = line.trim().match(/^([^:]+):\\s*(.*)$/);
      if (m) out[currentKey][m[1].replace(/[\\'\\\"]/g, "")] = m[2].replace(/[\\'\\\"]/g, "");
    } else {
      out[key] = rest.replace(/[\\'\\\"]/g, "");
      currentKey = null;
    }
  }
  return out;
}

function loadPersonas() {
  if (!fs.existsSync(PERSONA_DIR)) return [];
  const files = fs.readdirSync(PERSONA_DIR).filter(f => f.endsWith(".yaml") || f.endsWith(".yml"));
  return files.map(f => {
    const content = fs.readFileSync(path.join(PERSONA_DIR, f), "utf8");
    const nameMatch = content.match(/^persona_name:\\s*(.*)$/m);
    const systemMatch = content.match(/^system:\\s*\\n((?:\\s+.*\\n)+)/m);
    const personaId = path.basename(f, path.extname(f));
    const personaName = nameMatch ? nameMatch[1].replace(/[\\'\\\"]/g, "").trim() : personaId;
    const system = systemMatch ? systemMatch[1].split("\\n").map(l => l.replace(/^\\s+/, "")).join("\\n").trim() : content;
    return { id: personaId, name: personaName, system, raw: content };
  });
}

function loadSingleFallback() {
  const content = readFileIfExists(SINGLE_PERSONA_FALLBACK);
  if (!content) return null;
  const systemMatch = content.match(/^system:\\s*\\n((?:\\s+.*\\n)+)/m);
  const system = systemMatch ? systemMatch[1].split("\\n").map(l => l.replace(/^\\s+/, "")).join("\\n").trim() : content;
  return { id: "fallback", name: "fallback", system };
}

function choosePersona({ cliPersona, cwdPath }) {
  const envPersona = process.env.COPILOT_PERSONA;
  const personas = loadPersonas();
  const cfgText = readFileIfExists(CONFIG_PATH);
  const cfg = parseSimpleYaml(cfgText);

  if (cliPersona) {
    const found = personas.find(p => p.id === cliPersona || p.name === cliPersona);
    if (found) return found;
    console.warn(\`Persona '\${cliPersona}' not found in .copilot/personas\`);
  }

  if (envPersona) {
    const found = personas.find(p => p.id === envPersona || p.name === envPersona);
    if (found) return found;
    console.warn(\`Persona from COPILOT_PERSONA ('\${envPersona}') not found\`);
  }

  if (cfg.path_mappings && cwdPath) {
    const cwd = cwdPath.replace(/\\\\/g, "/");
    for (const [pattern, personaName] of Object.entries(cfg.path_mappings)) {
      if (cwd.includes(pattern.replace(/[\\'\\\"]/g, ""))) {
        const found = personas.find(p => p.id === personaName || p.name === personaName);
        if (found) return found;
      }
    }
  }

  if (cfg.default_persona) {
    const found = personas.find(p => p.id === cfg.default_persona || p.name === cfg.default_persona);
    if (found) return found;
  }

  const fallbackSingle = loadSingleFallback();
  if (fallbackSingle) return fallbackSingle;

  if (personas.length > 0) return personas[0];

  return null;
}

async function promptInteractive(personas) {
  if (!personas || personas.length === 0) return null;
  console.log("Available personas:");
  personas.forEach((p, i) => console.log(\`\${i + 1}) \${p.id} — \${p.name}\`));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise(resolve => rl.question("Choose persona number: ", a => { rl.close(); resolve(a); }));
  const idx = parseInt(answer, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= personas.length) return null;
  return personas[idx];
}

async function chatWithOpenAI(systemPrompt, userMessage) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error("Set OPENAI_API_KEY in environment.");
    process.exit(1);
  }

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    max_tokens: 1000
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    console.error("OpenAI error", await res.text());
    process.exit(1);
  }
  const data = await res.json();
  console.log("\\n=== Assistant ===\\n");
  console.log(data.choices[0].message.content);
}

(async function main() {
  const argv = process.argv.slice(2);
  const flags = {};
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--persona" && argv[i + 1]) { flags.persona = argv[++i]; continue; }
    if (a === "--list") { flags.list = true; continue; }
    if (a === "--interactive") { flags.interactive = true; continue; }
    rest.push(a);
  }

  const personas = loadPersonas();
  if (flags.list) {
    if (personas.length === 0) {
      console.log("No persona files found in .copilot/personas");
    } else {
      console.log("Personas:");
      personas.forEach(p => console.log(`- ${p.id}: ${p.name}`));
    }
    return;
  }

  const cwdPath = process.cwd();
  let chosen = choosePersona({ cliPersona: flags.persona, cwdPath });
  if (!chosen && flags.interactive) {
    chosen = await promptInteractive(personas);
  }
  if (!chosen) {
    console.error("No persona selected/found. Create .copilot/personas/<name>.yaml or set COPILOT_PERSONA, or run with --interactive.");
    process.exit(1);
  }

  const userMessage = rest.join(" ") || await new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Enter your question: ", ans => { rl.close(); resolve(ans); });
  });

  console.log(`Using persona: ${chosen.id} — ${chosen.name}`);
  await chatWithOpenAI(chosen.system, userMessage);
})();
