#!/usr/bin/env node
/**
 * Copilot Personas Chat Starter
 * 
 * A CLI to discover personas, read config, and start an LLM chat with the chosen persona.
 * 
 * USAGE:
 *   node scripts/start-chat.js [options] [message]
 * 
 * OPTIONS:
 *   --persona <name>       Select a specific persona by filename (without .yaml)
 *   --list                 List all available personas
 *   --interactive          Interactive mode to select persona
 *   --help                 Show this help message
 * 
 * ENVIRONMENT VARIABLES:
 *   COPILOT_PERSONA        Default persona to use (overridden by --persona)
 *   OPENAI_API_KEY         OpenAI API key (required for chat functionality)
 *   OPENAI_API_BASE        Optional: Custom API base URL (default: https://api.openai.com/v1)
 *   OPENAI_MODEL           Optional: Model to use (default: gpt-4)
 * 
 * PRIORITY ORDER (highest to lowest):
 *   1. --persona flag
 *   2. COPILOT_PERSONA environment variable
 *   3. Path mappings from .copilot/config.yaml
 *   4. default_persona from .copilot/config.yaml
 *   5. Single persona file (if only one exists)
 *   6. First persona alphabetically
 * 
 * EXAMPLES:
 *   # List all personas
 *   node scripts/start-chat.js --list
 * 
 *   # Use specific persona
 *   node scripts/start-chat.js --persona principal_frontend_engineer "How do I optimize React rendering?"
 * 
 *   # Interactive mode
 *   node scripts/start-chat.js --interactive
 * 
 *   # Use environment variable
 *   COPILOT_PERSONA=principal_sre node scripts/start-chat.js "Help me with CI/CD"
 * 
 * SWAPPING PROVIDERS:
 *   To use a different LLM provider (e.g., Azure OpenAI, Anthropic, local models):
 *   1. Update OPENAI_API_BASE to point to your provider's endpoint
 *   2. Adjust the API call in the sendChatMessage function to match your provider's format
 *   3. Update OPENAI_MODEL to match your provider's model names
 * 
 *   Example for Azure OpenAI:
 *     OPENAI_API_BASE="https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT"
 *     OPENAI_API_KEY="your-azure-key"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const REPO_ROOT = path.join(__dirname, '..');
const COPILOT_DIR = path.join(REPO_ROOT, '.copilot');
const PERSONAS_DIR = path.join(COPILOT_DIR, 'personas');
const CONFIG_FILE = path.join(COPILOT_DIR, 'config.yaml');

/**
 * Parse a simple YAML file (supports basic key-value and lists)
 */
function parseYaml(content) {
  const result = {};
  const lines = content.split('\n');
  let currentKey = null;
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle list items
    if (trimmed.startsWith('- ')) {
      if (currentKey && Array.isArray(result[currentKey])) {
        const value = trimmed.substring(2).trim().replace(/^["']|["']$/g, '');
        result[currentKey].push(value);
      }
      continue;
    }

    // Handle key-value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > -1) {
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();

      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');

      // Handle multiline strings (|)
      if (value === '|') {
        currentKey = key;
        result[key] = '';
        inList = false;
        continue;
      }

      // Check if this is a list or object
      if (!value) {
        currentKey = key;
        result[key] = [];
        inList = true;
      } else {
        result[key] = value;
        currentKey = null;
        inList = false;
      }
    } else if (currentKey && !inList) {
      // Continuation of multiline string
      result[currentKey] += (result[currentKey] ? '\n' : '') + line;
    }
  }

  return result;
}

/**
 * Load configuration from .copilot/config.yaml
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return { default_persona: null, path_mappings: {} };
  }

  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const parsed = parseYaml(content);

  // Handle path_mappings as a nested object
  const pathMappings = {};
  const lines = content.split('\n');
  let inPathMappings = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('path_mappings:')) {
      inPathMappings = true;
      continue;
    }
    if (inPathMappings && trimmed && !trimmed.startsWith('#')) {
      if (!trimmed.startsWith(' ') && !trimmed.startsWith('\t')) {
        inPathMappings = false;
        continue;
      }
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex > -1) {
        const key = trimmed.substring(0, colonIndex).trim().replace(/^["']|["']$/g, '');
        const value = trimmed.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        pathMappings[key] = value;
      }
    }
  }

  return {
    default_persona: parsed.default_persona || null,
    path_mappings: pathMappings
  };
}

/**
 * Load all persona files
 */
function loadPersonas() {
  if (!fs.existsSync(PERSONAS_DIR)) {
    console.error(`Error: Personas directory not found at ${PERSONAS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(PERSONAS_DIR).filter(f => f.endsWith('.yaml'));
  const personas = {};

  for (const file of files) {
    const personaId = path.basename(file, '.yaml');
    const content = fs.readFileSync(path.join(PERSONAS_DIR, file), 'utf-8');
    personas[personaId] = parseYaml(content);
    personas[personaId]._id = personaId;
  }

  return personas;
}

/**
 * Choose persona based on priority order
 */
function choosePersona(personas, config, args) {
  // 1. --persona flag
  if (args.persona) {
    if (personas[args.persona]) {
      return personas[args.persona];
    }
    console.error(`Error: Persona "${args.persona}" not found`);
    process.exit(1);
  }

  // 2. COPILOT_PERSONA environment variable
  if (process.env.COPILOT_PERSONA) {
    if (personas[process.env.COPILOT_PERSONA]) {
      return personas[process.env.COPILOT_PERSONA];
    }
  }

  // 3. Path mappings (use current directory)
  const cwd = process.cwd().replace(REPO_ROOT, '').replace(/^\//, '');
  for (const [pathPrefix, personaId] of Object.entries(config.path_mappings)) {
    if (cwd.startsWith(pathPrefix)) {
      if (personas[personaId]) {
        return personas[personaId];
      }
    }
  }

  // 4. default_persona from config
  if (config.default_persona && personas[config.default_persona]) {
    return personas[config.default_persona];
  }

  // 5. Single persona fallback
  const personaIds = Object.keys(personas);
  if (personaIds.length === 1) {
    return personas[personaIds[0]];
  }

  // 6. First persona alphabetically
  if (personaIds.length > 0) {
    personaIds.sort();
    return personas[personaIds[0]];
  }

  console.error('Error: No personas found');
  process.exit(1);
}

/**
 * List all available personas
 */
function listPersonas(personas) {
  console.log('\nAvailable Personas:\n');
  const personaIds = Object.keys(personas).sort();
  
  for (const id of personaIds) {
    const persona = personas[id];
    console.log(`  ${id}`);
    console.log(`    Name: ${persona.persona_name}`);
    console.log(`    Description: ${persona.description}`);
    console.log(`    Primary Language: ${persona.primary_language}`);
    console.log('');
  }
}

/**
 * Interactive persona selection
 */
async function interactiveSelect(personas) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const personaIds = Object.keys(personas).sort();
  
  console.log('\nSelect a persona:\n');
  personaIds.forEach((id, index) => {
    console.log(`  ${index + 1}. ${id} - ${personas[id].persona_name}`);
  });
  console.log('');

  return new Promise((resolve) => {
    rl.question('Enter number (1-' + personaIds.length + '): ', (answer) => {
      rl.close();
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < personaIds.length) {
        resolve(personas[personaIds[index]]);
      } else {
        console.error('Invalid selection');
        process.exit(1);
      }
    });
  });
}

/**
 * Send a chat message to OpenAI (or compatible provider)
 */
async function sendChatMessage(persona, userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    console.log('\nTo use this chat functionality:');
    console.log('  export OPENAI_API_KEY="your-api-key-here"');
    console.log('\nOr use a different provider by setting OPENAI_API_BASE');
    process.exit(1);
  }

  const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || 'gpt-4';

  console.log(`\nUsing persona: ${persona.persona_name}`);
  console.log(`Model: ${model}\n`);

  const messages = [
    { role: 'system', content: persona.system },
    { role: 'user', content: userMessage }
  ];

  try {
    // Using fetch (available in Node.js 18+)
    const response = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log('Assistant:', assistantMessage);
    console.log('');

  } catch (error) {
    console.error('Error calling LLM API:', error.message);
    process.exit(1);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = {
    persona: null,
    list: false,
    interactive: false,
    help: false,
    message: []
  };

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    
    if (arg === '--persona' && i + 1 < process.argv.length) {
      args.persona = process.argv[++i];
    } else if (arg === '--list') {
      args.list = true;
    } else if (arg === '--interactive') {
      args.interactive = true;
    } else if (arg === '--help') {
      args.help = true;
    } else if (!arg.startsWith('--')) {
      args.message.push(arg);
    }
  }

  return args;
}

/**
 * Show help message
 */
function showHelp() {
  const helpText = fs.readFileSync(__filename, 'utf-8');
  const match = helpText.match(/\/\*\*([\s\S]*?)\*\//);
  if (match) {
    console.log(match[1].split('\n').map(line => line.replace(/^ \* ?/, '')).join('\n'));
  }
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    return;
  }

  const personas = loadPersonas();
  const config = loadConfig();

  if (args.list) {
    listPersonas(personas);
    return;
  }

  let persona;
  if (args.interactive) {
    persona = await interactiveSelect(personas);
  } else {
    persona = choosePersona(personas, config, args);
  }

  const message = args.message.join(' ');
  if (!message) {
    console.log(`Selected persona: ${persona.persona_name}`);
    console.log(`ID: ${persona._id}`);
    console.log(`\nDescription: ${persona.description}`);
    console.log(`\nTo send a message, provide it as an argument:`);
    console.log(`  node scripts/start-chat.js "Your message here"`);
    return;
  }

  await sendChatMessage(persona, message);
}

// Run the CLI
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
