#!/usr/bin/env node

/**
 * Copilot Persona Chat CLI
 * 
 * A CLI tool to start chats with AI personas using LLM backends.
 * 
 * Usage:
 *   node scripts/start-chat.js [options] "Your message here"
 * 
 * Options:
 *   --persona <name>      Select a specific persona (e.g., principal_software_engineer)
 *   --list                List all available personas
 *   --interactive         Enter interactive mode to select a persona
 *   --help                Show this help message
 * 
 * Environment Variables:
 *   OPENAI_API_KEY        Required: Your OpenAI API key (https://platform.openai.com/api-keys)
 *   COPILOT_PERSONA       Optional: Default persona to use if --persona not specified
 * 
 * Examples:
 *   # List available personas
 *   node scripts/start-chat.js --list
 * 
 *   # Interactive persona selection
 *   node scripts/start-chat.js --interactive "How do I improve test coverage?"
 * 
 *   # Use specific persona
 *   node scripts/start-chat.js --persona principal_frontend_engineer "How to optimize React rendering?"
 * 
 *   # Use environment variable
 *   COPILOT_PERSONA=principal_sre node scripts/start-chat.js "How to set up CI/CD?"
 * 
 * Changing LLM Provider:
 *   This script uses OpenAI's chat completions API by default.
 *   To use a different provider (e.g., Anthropic, Azure OpenAI, local models):
 *   1. Replace the OPENAI_API_KEY environment variable with your provider's key
 *   2. Update the API_ENDPOINT constant below
 *   3. Modify the request body format in the callLLM() function to match your provider's API
 *   4. Update the response parsing logic if needed
 * 
 * For example, to use Anthropic Claude:
 *   - Set ANTHROPIC_API_KEY instead of OPENAI_API_KEY
 *   - Change API_ENDPOINT to 'https://api.anthropic.com/v1/messages'
 *   - Update headers and request body format per Anthropic's API docs
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ============================================================================
// Configuration
// ============================================================================

const REPO_ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(REPO_ROOT, '.copilot', 'config.yaml');
const PERSONAS_DIR = path.join(REPO_ROOT, '.copilot', 'personas');

// OpenAI API Configuration
// Replace with your provider's endpoint if using a different LLM service
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4'; // or 'gpt-3.5-turbo' for faster/cheaper responses

// ============================================================================
// YAML Parser (simple implementation for our use case)
// ============================================================================

function parseYAML(content) {
  const lines = content.split('\n');
  const result = {};
  let currentKey = null;
  let currentValue = '';
  let inMultiline = false;

  for (const line of lines) {
    if (line.trim().startsWith('#') || line.trim() === '') continue;

    if (line.match(/^(\w+):\s*\|/)) {
      // Multiline string
      currentKey = line.match(/^(\w+):/)[1];
      inMultiline = true;
      currentValue = '';
    } else if (inMultiline) {
      if (line.startsWith('  ') || line.startsWith('\t')) {
        currentValue += line.substring(2) + '\n';
      } else {
        result[currentKey] = currentValue.trim();
        inMultiline = false;
        currentKey = null;
      }
    } else if (line.includes(':')) {
      const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
      if (match) {
        const [, key, value] = match;
        result[key] = value.replace(/^"(.*)"$/, '$1');
      } else if (line.match(/^\s*-\s+/)) {
        // Array item
        if (!result[currentKey]) result[currentKey] = [];
        result[currentKey].push(line.trim().substring(2).replace(/^"(.*)"$/, '$1'));
      } else {
        const [key, ...valueParts] = line.split(':');
        if (valueParts.join(':').trim()) {
          result[key.trim()] = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
        } else {
          currentKey = key.trim();
          result[currentKey] = [];
        }
      }
    }
  }

  if (inMultiline && currentKey) {
    result[currentKey] = currentValue.trim();
  }

  return result;
}

// ============================================================================
// Persona Discovery
// ============================================================================

function discoverPersonas() {
  const personas = [];
  
  if (!fs.existsSync(PERSONAS_DIR)) {
    console.error(`Error: Personas directory not found at ${PERSONAS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(PERSONAS_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  
  for (const file of files) {
    const filePath = path.join(PERSONAS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const persona = parseYAML(content);
    persona.id = path.basename(file, path.extname(file));
    personas.push(persona);
  }

  return personas;
}

// ============================================================================
// Config Loading
// ============================================================================

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    return { default_persona: null, path_mappings: {} };
  }

  const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const config = parseYAML(content);
  
  // Parse path_mappings if present
  if (config.path_mappings) {
    const mappings = {};
    const lines = content.split('\n');
    let inMappings = false;
    
    for (const line of lines) {
      if (line.trim() === 'path_mappings:') {
        inMappings = true;
        continue;
      }
      if (inMappings && line.match(/^\s+"?([^"]+)"?:\s+"?([^"]+)"?$/)) {
        const match = line.match(/^\s+"?([^"]+)"?:\s+"?([^"]+)"?$/);
        if (match) {
          mappings[match[1].trim()] = match[2].trim().replace(/^"(.*)"$/, '$1');
        }
      } else if (inMappings && !line.startsWith(' ') && line.trim() !== '') {
        break;
      }
    }
    config.path_mappings = mappings;
  }

  return config;
}

// ============================================================================
// Persona Selection
// ============================================================================

function selectPersonaByPriority(personas, config, cliPersona, currentPath = process.cwd()) {
  // Priority 1: CLI flag --persona
  if (cliPersona) {
    const found = personas.find(p => p.id === cliPersona);
    if (found) return found;
    console.error(`Warning: Persona '${cliPersona}' not found. Falling back to other methods.`);
  }

  // Priority 2: Environment variable COPILOT_PERSONA
  const envPersona = process.env.COPILOT_PERSONA;
  if (envPersona) {
    const found = personas.find(p => p.id === envPersona);
    if (found) return found;
  }

  // Priority 3: Path mapping
  const relativePath = path.relative(REPO_ROOT, currentPath);
  if (config.path_mappings) {
    for (const [pathPattern, personaId] of Object.entries(config.path_mappings)) {
      if (relativePath.startsWith(pathPattern)) {
        const found = personas.find(p => p.id === personaId);
        if (found) return found;
      }
    }
  }

  // Priority 4: Config default
  if (config.default_persona) {
    const found = personas.find(p => p.id === config.default_persona);
    if (found) return found;
  }

  // Priority 5: Single file fallback
  if (personas.length === 1) {
    return personas[0];
  }

  // Priority 6: First persona alphabetically
  if (personas.length > 0) {
    return personas.sort((a, b) => a.id.localeCompare(b.id))[0];
  }

  return null;
}

// ============================================================================
// Interactive Selection
// ============================================================================

async function interactiveSelect(personas) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\nAvailable Personas:');
  personas.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.persona_name || p.id} - ${p.description || 'No description'}`);
  });

  return new Promise((resolve) => {
    rl.question('\nSelect a persona (1-' + personas.length + '): ', (answer) => {
      rl.close();
      const index = parseInt(answer, 10) - 1;
      if (index >= 0 && index < personas.length) {
        resolve(personas[index]);
      } else {
        console.error('Invalid selection. Using default.');
        resolve(null);
      }
    });
  });
}

// ============================================================================
// LLM Integration
// ============================================================================

async function callLLM(systemPrompt, userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('\n❌ Error: OPENAI_API_KEY environment variable is required.');
    console.error('\nTo use this CLI:');
    console.error('1. Get an API key from https://platform.openai.com/api-keys');
    console.error('2. Set the environment variable:');
    console.error('   export OPENAI_API_KEY="your-key-here"');
    console.error('\nOr to use a different LLM provider, see the comments at the top of this script.');
    process.exit(1);
  }

  console.log('\n🤖 Sending request to LLM...\n');

  const requestBody = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 2000
  };

  try {
    const https = require('https');
    const url = new URL(API_ENDPOINT);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode !== 200) {
            console.error('API Error:', data);
            reject(new Error(`API returned status ${res.statusCode}`));
            return;
          }

          try {
            const response = JSON.parse(data);
            const message = response.choices[0].message.content;
            resolve(message);
          } catch (error) {
            reject(new Error('Failed to parse API response: ' + error.message));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(JSON.stringify(requestBody));
      req.end();
    });
  } catch (error) {
    console.error('Error calling LLM:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// Main CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let cliPersona = null;
  let userMessage = '';
  let listMode = false;
  let interactiveMode = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      console.log(fs.readFileSync(__filename, 'utf-8').split('\n').slice(1, 50).join('\n'));
      process.exit(0);
    } else if (arg === '--list') {
      listMode = true;
    } else if (arg === '--interactive' || arg === '-i') {
      interactiveMode = true;
    } else if (arg === '--persona' || arg === '-p') {
      cliPersona = args[++i];
    } else if (!arg.startsWith('-')) {
      userMessage = arg;
    }
  }

  // Discover personas
  const personas = discoverPersonas();
  
  if (personas.length === 0) {
    console.error('Error: No personas found in', PERSONAS_DIR);
    process.exit(1);
  }

  // Handle --list mode
  if (listMode) {
    console.log('\nAvailable Personas:\n');
    personas.forEach(p => {
      console.log(`📋 ${p.id}`);
      console.log(`   Name: ${p.persona_name || 'N/A'}`);
      console.log(`   Description: ${p.description || 'N/A'}`);
      console.log(`   Primary Language: ${p.primary_language || 'N/A'}`);
      console.log('');
    });
    process.exit(0);
  }

  // Load config
  const config = loadConfig();

  // Select persona
  let selectedPersona;
  
  if (interactiveMode) {
    selectedPersona = await interactiveSelect(personas);
    if (!selectedPersona) {
      selectedPersona = selectPersonaByPriority(personas, config, cliPersona);
    }
  } else {
    selectedPersona = selectPersonaByPriority(personas, config, cliPersona);
  }

  if (!selectedPersona) {
    console.error('Error: Could not select a persona');
    process.exit(1);
  }

  console.log(`\n✅ Using persona: ${selectedPersona.persona_name || selectedPersona.id}`);
  console.log(`   Description: ${selectedPersona.description || 'N/A'}\n`);

  // Get user message if not provided
  if (!userMessage) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    userMessage = await new Promise((resolve) => {
      rl.question('Enter your message: ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  if (!userMessage || userMessage.trim() === '') {
    console.error('Error: No message provided');
    process.exit(1);
  }

  // Call LLM with persona system prompt
  const systemPrompt = selectedPersona.system || 'You are a helpful assistant.';
  
  try {
    const response = await callLLM(systemPrompt, userMessage);
    
    console.log('─'.repeat(80));
    console.log('Response:');
    console.log('─'.repeat(80));
    console.log(response);
    console.log('─'.repeat(80));
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the CLI
if (require.main === module) {
  main().catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { discoverPersonas, loadConfig, selectPersonaByPriority };
