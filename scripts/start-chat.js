#!/usr/bin/env node

/**
 * Copilot Persona Chat CLI
 * 
 * A Node.js CLI script for selecting and using Copilot personas to start AI chat sessions.
 * 
 * USAGE:
 *   node scripts/start-chat.js [options] [message]
 * 
 * OPTIONS:
 *   --persona <name>      Select a specific persona (e.g., software_engineer)
 *   --list                List all available personas
 *   --interactive         Interactive mode to select persona and enter message
 *   --help                Show this help message
 * 
 * ENVIRONMENT VARIABLES:
 *   COPILOT_PERSONA       Default persona to use if --persona is not specified
 *   OPENAI_API_KEY        Your OpenAI API key (REQUIRED for chat functionality)
 * 
 * CONFIGURATION:
 *   The script reads from .copilot/config.yaml for default persona and path mappings.
 *   Persona definitions are loaded from .copilot/personas/*.yaml
 * 
 * EXAMPLES:
 *   # List available personas
 *   node scripts/start-chat.js --list
 * 
 *   # Start chat with specific persona
 *   node scripts/start-chat.js --persona devops_engineer "How do I set up CI/CD?"
 * 
 *   # Interactive mode
 *   node scripts/start-chat.js --interactive
 * 
 * CHANGING LLM PROVIDERS:
 *   By default, this script uses OpenAI's chat completions API.
 *   To use a different provider (e.g., Anthropic, Azure OpenAI, local models):
 *   1. Replace the API call in the sendChatMessage() function
 *   2. Update the API key environment variable name as needed
 *   3. Adjust the request/response format for your provider
 * 
 * SECURITY NOTE:
 *   Never commit API keys to source control. Use environment variables or a .env file.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// --- Configuration ---
const REPO_ROOT = path.resolve(__dirname, '..');
const COPILOT_DIR = path.join(REPO_ROOT, '.copilot');
const PERSONAS_DIR = path.join(COPILOT_DIR, 'personas');
const CONFIG_FILE = path.join(COPILOT_DIR, 'config.yaml');

// --- Helper Functions ---

/**
 * Simple YAML parser (handles basic YAML structures used in our persona files)
 */
function parseYaml(content) {
  const lines = content.split('\n');
  const result = {};
  let currentKey = null;
  let currentArray = null;
  let multilineKey = null;
  let multilineContent = [];

  for (let line of lines) {
    // Handle multiline strings (|)
    if (multilineKey) {
      if (line.startsWith('  ')) {
        multilineContent.push(line.substring(2));
      } else {
        result[multilineKey] = multilineContent.join('\n').trim();
        multilineKey = null;
        multilineContent = [];
      }
    }

    // Key-value pairs
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      if (value === '|') {
        multilineKey = key;
        multilineContent = [];
      } else if (value === '') {
        currentKey = key;
        currentArray = [];
        result[key] = currentArray;
      } else if (value.startsWith('"') && value.endsWith('"')) {
        result[key] = value.substring(1, value.length - 1);
      } else {
        result[key] = value;
      }
    }

    // Array items
    const arrayMatch = line.match(/^\s*-\s+"?([^"]+)"?$/);
    if (arrayMatch && currentArray) {
      currentArray.push(arrayMatch[1]);
    }
  }

  // Handle any remaining multiline content
  if (multilineKey) {
    result[multilineKey] = multilineContent.join('\n').trim();
  }

  return result;
}

/**
 * Load all persona files from the personas directory
 */
function loadPersonas() {
  if (!fs.existsSync(PERSONAS_DIR)) {
    console.error(`Error: Personas directory not found: ${PERSONAS_DIR}`);
    process.exit(1);
  }

  const personaFiles = fs.readdirSync(PERSONAS_DIR).filter(f => f.endsWith('.yaml'));
  const personas = {};

  for (const file of personaFiles) {
    const personaId = path.basename(file, '.yaml');
    const content = fs.readFileSync(path.join(PERSONAS_DIR, file), 'utf-8');
    personas[personaId] = parseYaml(content);
    personas[personaId].id = personaId;
  }

  return personas;
}

/**
 * Load configuration from .copilot/config.yaml
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return { default_persona: null, path_mappings: {} };
  }

  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const config = parseYaml(content);
  
  // Parse path_mappings if present
  if (!config.path_mappings) {
    config.path_mappings = {};
  }

  return config;
}

/**
 * Select persona based on priority:
 * 1. CLI flag --persona
 * 2. COPILOT_PERSONA env var
 * 3. Path mapping (based on current directory)
 * 4. Config default
 * 5. Single-file fallback
 * 6. First persona
 */
function selectPersona(personas, config, options) {
  // Priority 1: CLI flag
  if (options.persona) {
    if (personas[options.persona]) {
      return personas[options.persona];
    }
    console.error(`Error: Persona '${options.persona}' not found`);
    process.exit(1);
  }

  // Priority 2: Environment variable
  if (process.env.COPILOT_PERSONA) {
    const envPersona = process.env.COPILOT_PERSONA;
    if (personas[envPersona]) {
      return personas[envPersona];
    }
  }

  // Priority 3: Path mapping
  const cwd = process.cwd();
  const relativePath = path.relative(REPO_ROOT, cwd);
  if (config.path_mappings) {
    for (const [pathPattern, personaId] of Object.entries(config.path_mappings)) {
      if (relativePath.startsWith(pathPattern.replace(/\/$/, ''))) {
        if (personas[personaId]) {
          return personas[personaId];
        }
      }
    }
  }

  // Priority 4: Config default
  if (config.default_persona && personas[config.default_persona]) {
    return personas[config.default_persona];
  }

  // Priority 5 & 6: Single-file fallback or first persona
  const personaIds = Object.keys(personas);
  if (personaIds.length === 1) {
    return personas[personaIds[0]];
  }
  if (personaIds.length > 0) {
    return personas[personaIds[0]];
  }

  console.error('Error: No personas available');
  process.exit(1);
}

/**
 * List all available personas
 */
function listPersonas(personas) {
  console.log('\nAvailable Personas:\n');
  for (const [id, persona] of Object.entries(personas)) {
    console.log(`  ${id}`);
    console.log(`    Name: ${persona.persona_name}`);
    console.log(`    Description: ${persona.description}`);
    console.log(`    Primary Language: ${persona.primary_language}`);
    console.log('');
  }
}

/**
 * Send a chat message to OpenAI API
 * 
 * NOTE: You must set OPENAI_API_KEY environment variable.
 * 
 * To change LLM providers:
 * - Replace this function with your provider's API call
 * - Update the API endpoint, headers, and request/response format
 * - Examples: Anthropic Claude, Azure OpenAI, local Ollama, etc.
 */
async function sendChatMessage(systemPrompt, userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('\n⚠️  OPENAI_API_KEY environment variable is not set.');
    console.error('Please set your OpenAI API key to use the chat functionality:');
    console.error('  export OPENAI_API_KEY="your-api-key-here"');
    console.error('\nTo use a different LLM provider, edit the sendChatMessage() function');
    console.error('in scripts/start-chat.js and update the API call accordingly.\n');
    process.exit(1);
  }

  console.log('\n🤖 Sending message to OpenAI...\n');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      process.exit(1);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    process.exit(1);
  }
}

/**
 * Interactive mode for selecting persona and entering message
 */
function interactiveMode(personas, config) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n=== Copilot Persona Chat (Interactive Mode) ===\n');
  
  // List personas with numbers
  const personaIds = Object.keys(personas);
  personaIds.forEach((id, index) => {
    console.log(`  ${index + 1}. ${id} - ${personas[id].description}`);
  });

  rl.question('\nSelect persona (1-' + personaIds.length + '): ', (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= personaIds.length) {
      console.error('Invalid selection');
      rl.close();
      process.exit(1);
    }

    const selectedPersona = personas[personaIds[index]];
    console.log(`\n✓ Selected: ${selectedPersona.persona_name}\n`);

    rl.question('Enter your message: ', async (message) => {
      rl.close();
      if (!message.trim()) {
        console.error('Error: Message cannot be empty');
        process.exit(1);
      }

      const response = await sendChatMessage(selectedPersona.system, message);
      console.log('Response:\n');
      console.log(response);
      console.log('\n');
    });
  });
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
Copilot Persona Chat CLI

USAGE:
  node scripts/start-chat.js [options] [message]

OPTIONS:
  --persona <name>      Select a specific persona (e.g., software_engineer)
  --list                List all available personas
  --interactive         Interactive mode to select persona and enter message
  --help                Show this help message

ENVIRONMENT VARIABLES:
  COPILOT_PERSONA       Default persona to use if --persona is not specified
  OPENAI_API_KEY        Your OpenAI API key (REQUIRED for chat functionality)

EXAMPLES:
  # List available personas
  node scripts/start-chat.js --list

  # Start chat with specific persona
  node scripts/start-chat.js --persona devops_engineer "How do I set up CI/CD?"

  # Interactive mode
  node scripts/start-chat.js --interactive

  # Use environment variable for persona
  COPILOT_PERSONA=cloud_architect node scripts/start-chat.js "Design a scalable API"
`);
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2);
  const options = {
    persona: null,
    list: false,
    interactive: false,
    help: false,
  };

  // Parse arguments
  const messageArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--persona' && i + 1 < args.length) {
      options.persona = args[++i];
    } else if (args[i] === '--list') {
      options.list = true;
    } else if (args[i] === '--interactive') {
      options.interactive = true;
    } else if (args[i] === '--help') {
      options.help = true;
    } else if (!args[i].startsWith('--')) {
      messageArgs.push(args[i]);
    }
  }

  if (options.help) {
    showHelp();
    return;
  }

  const personas = loadPersonas();
  const config = loadConfig();

  if (options.list) {
    listPersonas(personas);
    return;
  }

  if (options.interactive) {
    interactiveMode(personas, config);
    return;
  }

  const message = messageArgs.join(' ');
  if (!message) {
    console.error('Error: No message provided. Use --help for usage information.');
    process.exit(1);
  }

  const selectedPersona = selectPersona(personas, config, options);
  console.log(`\n✓ Using persona: ${selectedPersona.persona_name}\n`);

  const response = await sendChatMessage(selectedPersona.system, message);
  console.log('Response:\n');
  console.log(response);
  console.log('\n');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
