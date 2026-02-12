#!/usr/bin/env bash
set -euo pipefail

BRANCH="copilot/personas"
BASE="main"
PR_TITLE="Add .copilot personas, CLI, VS Code extension (workspace defaults + auto-copy) and VSIX packaging"
PR_BODY=$(cat <<'BODY'
Add repository-level persona files (Principal+ personas for enterprise roles), a CLI to start chats with persona system prompts,
a VS Code extension scaffold that copies persona prompts to clipboard (with workspace default and auto-copy options),
and a GitHub Actions workflow to package the extension into a .vsix artifact.

How to use:
- CLI: scripts/start-chat.js (Node 18+). Example: OPENAI_API_KEY=... node scripts/start-chat.js --list
- VS Code extension: vscode-extensions/copilot-personas (run in dev host or build/package with vsce)
- Workspace settings:
  - copilotPersonas.defaultPersona (string)
  - copilotPersonas.autoCopyOnOpen (boolean, default false)

Security note: Persona files are plain text and must NOT contain secrets.

This PR includes the persona YAMLs, a simple chat CLI (OpenAI example), a VS Code extension scaffold with clipboard-based integration and workspace default/auto-copy support, and a CI workflow to package a .vsix artifact.
BODY
)

echo "Checking git status..."
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This script must be run from inside a git repository (repo root)."
  exit 1
fi

# NEW: allow untracked files but disallow changes to tracked files
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Working tree has uncommitted tracked changes. Commit or stash tracked changes before running."
  git status --porcelain --untracked-files=no
  exit 1
fi

echo "Creating branch $BRANCH..."
git checkout -b "$BRANCH"

echo "Creating files..."
mkdir -p .copilot/personas scripts vscode-extensions/copilot-personas/src .github/workflows

# .copilot/config.yaml
cat > .copilot/config.yaml <<'YAML'
default_persona: "principal_software_engineer"
path_mappings:
  "infrastructure/": "principal_sre"
  "infra/": "principal_sre"
  "packages/cloud/": "principal_cloud_architect"
  "packages/frontend/": "principal_frontend_engineer"
YAML

# Persona files (principal_software_engineer.yaml ... principal_tech_lead.yaml)
cat > .copilot/personas/principal_software_engineer.yaml <<'YAML'
persona_name: "Principal+ Software Engineer"
description: "Principal+ software engineer; deep experience across modern stacks with strong specialisation in TypeScript/JavaScript and C#. Pragmatic, maintainable, test-first approach."
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
  - "Python"
  - "Go"
  - "Java"
specialties:
  - "API design"
  - "system reliability"
  - "refactoring at scale"
  - "typing and type-safety"
  - "tests and CI"
system: |
  You are a Principal+ Software Engineer with extensive, production-proven experience across modern stacks and a strong preference for TypeScript/JavaScript and C# where appropriate.
  When assisting in this repository:
  - Prefer idiomatic TypeScript/JavaScript or C# solutions for application code; include types, interfaces, and compile-time safety.
  - Provide minimal, focused unit tests (TS/C# as appropriate) and explain the testing strategy.
  - Explain tradeoffs, give backwards-compatible options, and include stepwise migration plans for non-trivial changes.
  - When delivering code changes include a small patch and matching test(s) demonstrating behavior.
  - Do not make breaking changes to public APIs without explicit confirmation.
YAML

cat > .copilot/personas/principal_software_architect.yaml <<'YAML'
persona_name: "Principal+ Software Architect"
description: "Principal-level architect: system boundaries, long-term maintainability, and scaling for enterprise systems with emphasis on TypeScript/JavaScript and C# ecosystems."
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
  - "Java"
  - "Go"
specialties:
  - "system design"
  - "architecture patterns"
  - "evolutionary architecture"
  - "domain modeling"
system: |
  You are a Principal+ Software Architect focused on pragmatic, enterprise-grade design. Prefer solutions that are implementable by TypeScript/JavaScript or C# teams.
  When advising:
  - Provide clear high-level designs, suggested module/file organization, and diagrams when helpful.
  - List pros/cons, estimated effort, operational impact, and incremental rollout strategies.
  - Prioritize backward-compatible, incremental approaches; explicitly label breaking changes and provide migration steps.
  - Recommend measurable success criteria and tests to validate architectural choices.
YAML

cat > .copilot/personas/principal_cloud_architect.yaml <<'YAML'
persona_name: "Principal+ Cloud Architect"
description: "Enterprise cloud architect: secure, cost-effective, resilient cloud platform and application architecture. Focus on TypeScript/JS and C# applications running on Azure/AWS; Terraform knowledge included."
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
  - "Terraform"
  - "Python"
specialties:
  - "cloud architecture (Azure, AWS)"
  - "infrastructure as code (Terraform, CloudFormation familiarity)"
  - "cost and performance optimization"
  - "resiliency and disaster recovery"
  - "security and compliance"
system: |
  You are a Principal+ Cloud Architect. Design cloud platforms and application deployment patterns for Azure and AWS, and recommend IaC (Terraform by preference; CloudFormation familiarity acceptable).
  When recommending changes:
  - Provide Terraform (or clear CloudFormation) snippets, CI/CD pipeline changes, and rollout/rollback steps.
  - Call out cost, security, and operational impacts, monitoring/observability requirements, and automation testing for infra changes.
  - Prefer minimal blast radius, automated testing of infra changes, and safe defaults for identity, networking, and storage.
  - When discussing app design, prefer TypeScript/JS or C# examples for code-level guidance.
YAML

cat > .copilot/personas/principal_sre.yaml <<'YAML'
persona_name: "Principal+ SRE / DevOps Engineer"
description: "Principal-level SRE/DevOps: reliability engineering, CI/CD, deployments and runbooks. Strong familiarity with TypeScript/JS and C# app stacks and tooling including Azure DevOps (ADO), CloudFormation, and GitHub Actions."
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
  - "YAML"
  - "Bash"
  - "PowerShell"
specialties:
  - "CI/CD pipelines (GitHub Actions, Azure DevOps)"
  - "deployment automation (canary, blue-green, rollbacks)"
  - "CloudFormation and Terraform familiarity"
  - "observability: metrics/logs/traces"
  - "runbooks and incident response"
system: |
  You are a Principal+ SRE / DevOps Engineer. Focus on reliability, repeatable automated deployments, and operational runbooks.
  When advising:
  - Produce concrete CI/CD config snippets (GitHub Actions and Azure DevOps YAML), deployment manifests, and step-by-step rollback procedures.
  - Recommend canary/blue-green strategies, health checks, and automated remediation where possible.
  - Provide monitoring/alerting suggestions (with thresholds) and clear runbook steps for common incidents.
  - Use YAML/Bash/PowerShell snippets as needed and include examples for TypeScript/JS and C# app deployment and health checks.
YAML

cat > .copilot/personas/principal_security_engineer.yaml <<'YAML'
persona_name: "Principal+ Security Engineer"
description: "Enterprise security persona: application and infrastructure security, threat modelling, secure defaults, and remediation plans. Works closely with the other principal personas."
primary_language: "Security tooling / Python"
languages:
  - "Python"
  - "TypeScript"
  - "C#"
  - "Terraform"
specialties:
  - "threat modeling"
  - "secure coding practices"
  - "vulnerability remediation"
  - "IAM and secrets management"
system: |
  You are a Principal+ Security Engineer. Focus on secure-by-default designs and practical remediation plans that integrate with the app and infra personas.
  When advising:
  - Provide secure code patterns and concrete remediation steps for vulnerabilities across TypeScript/JS, C#, and infra IaC.
  - Produce threat models, prioritized action items, and recommended CI checks (SAST/DAST), SSO/IAM configs, and secrets management.
  - Indicate exploitability and risk level, and provide clear rollback/mitigation plans that other roles (SRE, Cloud Architect, Engineers) can follow.
YAML

cat > .copilot/personas/principal_data_engineer.yaml <<'YAML'
persona_name: "Principal+ Data Engineer"
description: "Principal-level data engineer: data pipelines, modeling, ETL/ELT, data quality and schema design for analytics and ML. Strong focus on Azure and AWS DB services."
primary_language: "Python / SQL"
languages:
  - "Python"
  - "SQL"
  - "TypeScript"
  - "Spark / PySpark"
specialties:
  - "data pipelines (ETL/ELT)"
  - "schema and contract design"
  - "data quality and observability"
  - "Azure and AWS DB/platform services"
system: |
  You are a Principal+ Data Engineer. Provide production-ready designs for data pipelines and schemas, with a focus on Azure and AWS DB/platform services (e.g., Azure SQL, Azure Data Factory, Synapse, AWS RDS, Redshift, Glue).
  When helping:
  - Provide SQL or Python examples, explain data contracts and migration strategies, and include testing ideas for data quality.
  - Recommend monitoring, SLAs for freshness, and rollback strategies for pipeline failures.
  - Prefer idempotent transformations and safe schema evolution techniques, and call out operational costs and scaling characteristics.
YAML

cat > .copilot/personas/principal_frontend_engineer.yaml <<'YAML'
persona_name: "Principal+ Frontend Engineer"
description: "Principal+ frontend specialist: modern web apps, component architecture, accessibility, performance, and developer experience. Strong TypeScript/React focus and experience with TanStack, Playwright, Vitest, Vite, Module Federation and Material UI."
primary_language: "TypeScript / React"
languages:
  - "TypeScript"
  - "JavaScript"
  - "CSS"
specialties:
  - "React / component architecture"
  - "a11y and UX"
  - "frontend performance"
  - "state management and testing"
  - "TanStack, Playwright, Vitest, Vite, Module Federation, Material UI"
system: |
  You are a Principal+ Frontend Engineer specializing in TypeScript + React and modern frontend tooling.
  When producing suggestions:
  - Prefer accessible, performant, and testable component patterns using TypeScript. Include examples with types and prop contracts.
  - Advise on TanStack (Query/Router/State), Module Federation patterns, Vite bundling, and Material UI usage when relevant.
  - Provide testing approaches (Vitest unit tests, Playwright E2E), performance tuning tips, and developer ergonomics improvements.
  - Explain tradeoffs for state management, bundling, SSR/CSR, and runtime behavior.
YAML

cat > .copilot/personas/principal_qa_engineer.yaml <<'YAML'
persona_name: "Principal+ QA / Test Engineer"
description: "Principal testing engineer: test strategy, automation, contract tests, and reliability for enterprise releases. Focused on TypeScript and C# applications while supporting the full stack."
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "C#"
  - "Python"
specialties:
  - "test strategy and frameworks"
  - "integration and E2E testing"
  - "contract testing"
  - "test automation and flaky-test mitigation"
system: |
  You are a Principal+ QA / Test Engineer. Provide test strategies that balance speed and confidence and are targeted at TypeScript and C# apps (while supporting other stacks).
  When advising:
  - Recommend test pyramids, concrete test examples (unit, integration, E2E), and flaky-test mitigation strategies.
  - Provide CI examples to run tests, gating policies, and approaches to measure test coverage and quality.
  - When suggesting test code include assertions and minimal fixtures, and prefer frameworks used in the repo (Vitest, Playwright, xUnit, NUnit, etc.) where applicable.
YAML

cat > .copilot/personas/principal_tech_lead.yaml <<'YAML'
persona_name: "Principal+ Tech Lead"
description: "Principal-level tech lead: combines technical judgement with delivery, code reviews, mentorship, and architecture tradeoffs across all roles described."
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
specialties:
  - "code review guidance"
  - "delivery planning"
  - "mentorship and team leadership"
  - "cross-discipline coordination"
system: |
  You are a Principal+ Tech Lead. Provide pragmatic technical direction, clear review guidance, and actionable next steps across frontend, backend, cloud, SRE, security, data, and QA domains.
  When advising:
  - Give succinct code review comments with rationale, prioritized action items, and suggested implementation steps.
  - Provide delivery plans, risk assessments, and communication guidance for stakeholders.
  - Recommend ways to coordinate cross-functional work, mentoring approaches, and measures to keep code quality and team velocity high.
YAML

# scripts/start-chat.js (same content as earlier, creating a Node CLI example)
cat > scripts/start-chat.js <<'JS'
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
JS

chmod +x scripts/start-chat.js

# VS Code extension scaffold package.json
cat > vscode-extensions/copilot-personas/package.json <<'JSON'
{
  "name": "copilot-personas",
  "displayName": "Copilot Personas",
  "description": "Pick repo personas and copy their system prompt to the clipboard for Copilot Chat.",
  "version": "0.0.1",
  "publisher": "ryanj27",
  "engines": { "vscode": "^1.60.0" },
  "categories": ["Other"],
  "activationEvents": [
    "onCommand:copilotPersonas.selectPersona",
    "onCommand:copilotPersonas.selectAndOpenChat",
    "onCommand:copilotPersonas.recopyLastPersona",
    "onStartupFinished"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "copilotPersonas.selectPersona",
        "title": "Copilot: Copy Persona to Clipboard"
      },
      {
        "command": "copilotPersonas.selectAndOpenChat",
        "title": "Copilot: Copy Persona and Open Chat"
      },
      {
        "command": "copilotPersonas.recopyLastPersona",
        "title": "Copilot: Re-copy Last Persona to Clipboard"
      }
    ],
    "keybindings": [
      {
        "command": "copilotPersonas.selectPersona",
        "key": "ctrl+alt+p",
        "when": "editorTextFocus"
      }
    ],
    "configuration": {
      "type": "object",
      "title": "Copilot Personas",
      "properties": {
        "copilotPersonas.defaultPersona": {
          "type": "string",
          "default": "",
          "description": "Default persona id to copy on open when autoCopyOnOpen is true."
        },
        "copilotPersonas.autoCopyOnOpen": {
          "type": "boolean",
          "default": false,
          "description": "Automatically copy the default persona to the clipboard when the workspace opens."
        }
      }
    }
  },
  "dependencies": {
    "js-yaml": "^4.1.0"
  },
  "scripts": {
    "compile": "tsc -p . || true",
    "package:vsix": "npx vsce package"
  },
  "devDependencies": {
    "typescript": "^4.0.0",
    "vscode": "^1.1.37",
    "@types/node": "^16.0.0",
    "@types/vscode": "^1.60.0"
  }
}
JSON

# VS Code extension source (TypeScript)
cat > vscode-extensions/copilot-personas/src/extension.ts <<'TS'
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const LAST_PERSONA_KEY = 'copilotPersonas.lastPersona';

export function activate(context: vscode.ExtensionContext) {
  const ws = vscode.workspace.workspaceFolders;
  if (!ws || ws.length === 0) {
    // nothing to do until a workspace is open
  }

  async function loadPersonasFromWorkspace() {
    if (!vscode.workspace.workspaceFolders) return [];
    const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const personasDir = path.join(root, '.copilot', 'personas');
    if (!fs.existsSync(personasDir)) return [];
    const files = fs.readdirSync(personasDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    const personas: any[] = [];
    for (const f of files) {
      const content = fs.readFileSync(path.join(personasDir, f), 'utf8');
      let doc: any = {};
      try { doc = yaml.load(content) || {}; } catch (e) { doc = {}; }
      const id = path.basename(f, path.extname(f));
      const name = doc.persona_name || id;
      const system = doc.system || content;
      personas.push({ id, name, system });
    }
    return personas;
  }

  async function copyToClipboard(text: string) {
    await vscode.env.clipboard.writeText(text);
  }

  const selectPersona = vscode.commands.registerCommand('copilotPersonas.selectPersona', async () => {
    const personas = await loadPersonasFromWorkspace();
    if (!personas || personas.length === 0) {
      vscode.window.showErrorMessage('No persona files found in .copilot/personas');
      return;
    }
    const picks = personas.map(p => ({ label: p.name, description: p.id, persona: p }));
    const picked = await vscode.window.showQuickPick(picks, { placeHolder: 'Select persona to copy to clipboard' });
    if (!picked) return;
    await copyToClipboard(picked.persona.system);
    await context.workspaceState.update(LAST_PERSONA_KEY, picked.persona.id);
    vscode.window.showInformationMessage(`Persona '${picked.label}' copied to clipboard. Paste into Copilot Chat input (Ctrl+V).`);
  });

  const selectAndOpen = vscode.commands.registerCommand('copilotPersonas.selectAndOpenChat', async () => {
    await vscode.commands.executeCommand('copilotPersonas.selectPersona');
    // Best-effort attempts to open Copilot Chat; may not be available in all Copilot versions.
    const knownCommands = [
      'github.copilot-chat.open',
      'github.copilot-chat.openPanel',
      'github.copilot.openChat',
      'copilot.chat.open'
    ];
    for (const cmd of knownCommands) {
      try { await vscode.commands.executeCommand(cmd); return; } catch (e) { /* ignore */ }
    }
    vscode.window.showInformationMessage('Could not automatically open Copilot Chat. Please open it and paste the persona (Ctrl+V).');
  });

  const recopyLast = vscode.commands.registerCommand('copilotPersonas.recopyLastPersona', async () => {
    const lastId = context.workspaceState.get<string>(LAST_PERSONA_KEY);
    if (!lastId) {
      vscode.window.showInformationMessage('No last persona recorded. Use "Copilot: Copy Persona to Clipboard" first.');
      return;
    }
    const personas = await loadPersonasFromWorkspace();
    const found = personas.find(p => p.id === lastId);
    if (!found) {
      vscode.window.showErrorMessage(`Last persona '${lastId}' not found in .copilot/personas`);
      return;
    }
    await copyToClipboard(found.system);
    vscode.window.showInformationMessage(`Persona '${found.name}' re-copied to clipboard.`);
  });

  context.subscriptions.push(selectPersona, selectAndOpen, recopyLast);

  // Auto-copy default persona on open if configured
  async function maybeAutoCopyDefault() {
    const config = vscode.workspace.getConfiguration();
    const autoCopy = config.get<boolean>('copilotPersonas.autoCopyOnOpen', false);
    const defaultPersona = config.get<string>('copilotPersonas.defaultPersona', '');
    if (!autoCopy || !defaultPersona) return;
    const personas = await loadPersonasFromWorkspace();
    const found = personas.find(p => p.id === defaultPersona || p.name === defaultPersona);
    if (!found) {
      vscode.window.showWarningMessage(`Default persona '${defaultPersona}' not found in .copilot/personas`);
      return;
    }
    await copyToClipboard(found.system);
    await context.workspaceState.update(LAST_PERSONA_KEY, found.id);
    vscode.window.showInformationMessage(`Default persona '${found.name}' copied to clipboard.`);
  }

  // Run once on activation (workspace open)
  maybeAutoCopyDefault().catch(() => {});
}

export function deactivate() {}
TS

# Extension README
cat > vscode-extensions/copilot-personas/README.md <<'MD'
# Copilot Personas (VS Code extension scaffold)

What it does
- Reads persona YAML files from `.copilot/personas/*.yaml`.
- Lets you pick a persona and copies its `system:` prompt to the clipboard.
- Optionally attempts to open the Copilot Chat panel (best-effort) and supports workspace default + auto-copy.

Install (dev)
1. cd vscode-extensions/copilot-personas
2. npm install
3. npm run compile (or `tsc -p .`)
4. Press F5 in VS Code to run the extension in the Extension Development Host.

Usage
- Run the command "Copilot: Copy Persona to Clipboard" from the Command Palette.
- Or use the keybinding Ctrl+Alt+P.
- Open Copilot Chat and paste (Ctrl+V) into the chat input.

Workspace settings
- `copilotPersonas.defaultPersona` — string: persona id to copy on open when autoCopyOnOpen is true.
- `copilotPersonas.autoCopyOnOpen` — boolean: if true, the default persona will be copied to the clipboard when the workspace opens.

Packaging
- `npm run package:vsix` will create a .vsix (requires vsce). CI will also produce a .vsix artifact.

Notes
- This extension uses the clipboard as a robust integration mechanism because Copilot Chat does not currently expose a stable API for third-party extensions to write into its input.
MD

# GitHub Actions workflow to package vsix
cat > .github/workflows/package-vsix.yaml <<'YAML'
name: Package VSIX

on:
  push:
    branches:
      - copilot/personas
  pull_request:
    branches:
      - main

jobs:
  package:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Package VSIX
        working-directory: vscode-extensions/copilot-personas
        run: |
          npm ci
          npm run compile || true
          npx vsce package
      - name: Upload VSIX artifact
        uses: actions/upload-artifact@v4
        with:
          name: copilot-personas-vsix
          path: vscode-extensions/copilot-personas/*.vsix
YAML

echo "Creating .gitignore to avoid committing built files..."
cat > .gitignore <<'IGN'
.vscode/
node_modules/
.vs/
out/
*.vsix
IGN

git add -A
git commit -m "Add .copilot personas, CLI, VS Code extension scaffold and VSIX packaging workflow"
git push -u origin "$BRANCH"

if command -v gh >/dev/null 2>&1; then
  echo "Creating Draft PR using gh..."
  gh pr create --fill --draft --base "$BASE" --head "$BRANCH" --title "$PR_TITLE" --body "$PR_BODY"
  echo "Draft PR created."
else
  echo "gh CLI not found. The branch has been pushed. Run the following to create a Draft PR:"
  echo "  gh pr create --fill --draft --base $BASE --head $BRANCH --title \"$PR_TITLE\" --body \"$PR_BODY\""
fi

echo "Done."