#!/usr/bin/env node

/**
 * Copilot Persona Chat CLI
 * 
 * This script allows you to start a chat with a specific Copilot persona.
 * It supports multiple ways to select a persona:
 * - CLI flag: --persona <name>
 * - Environment variable: COPILOT_PERSONA
 * - Path-based mapping from config.yaml
 * - Default persona from config.yaml
 * 
 * Usage:
 *   node scripts/start-chat.js --persona software_engineer "How do I implement this feature?"
 *   COPILOT_PERSONA=cloud_architect node scripts/start-chat.js "How should I deploy this?"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(REPO_ROOT, '.copilot', 'config.yaml');
const PERSONAS_DIR = path.join(REPO_ROOT, '.copilot', 'personas');

/**
 * Simple YAML parser for our config files
 * Handles basic YAML structures with key: value and lists
 */
function parseYAML(content) {
  const lines = content.split('\n');
  const result = {};
  let currentKey = null;
  let currentList = null;
  let currentItem = null;
  let inSystemBlock = false;
  let systemContent = [];
  
  for (let line of lines) {
    // Skip comments and empty lines (unless in system block)
    if (line.trim().startsWith('#') || line.trim() === '') {
      if (inSystemBlock && line.trim() === '') {
        systemContent.push(line);
      }
      continue;
    }
    
    // Handle system block (multiline)
    if (line.match(/^system:\s*\|/)) {
      // Save any pending list before starting system block
      if (currentKey && currentList) {
        result[currentKey] = currentList;
        currentList = null;
        currentItem = null;
      }
      inSystemBlock = true;
      currentKey = 'system';
      systemContent = [];
      continue;
    }
    
    if (inSystemBlock) {
      if (line.match(/^\S/)) {
        // End of system block (next top-level key)
        result.system = systemContent.join('\n').trim();
        inSystemBlock = false;
        systemContent = [];
        // Fall through to process this line
      } else {
        systemContent.push(line);
        continue;
      }
    }
    
    // Handle list items
    if (line.trim().startsWith('- ')) {
      const value = line.trim().substring(2).trim();
      
      if (!currentList) {
        currentList = [];
      }
      
      // Check if it's a key: value pair
      if (value.includes(':')) {
        const colonIndex = value.indexOf(':');
        const key = value.substring(0, colonIndex).trim();
        let val = value.substring(colonIndex + 1).trim();
        // Remove quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        currentItem = { [key]: val };
        currentList.push(currentItem);
      } else {
        currentList.push(value);
        currentItem = null;
      }
      continue;
    }
    
    // Handle key: value pairs
    const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
    if (match) {
      const indent = match[1];
      const key = match[2].trim();
      let value = match[3].trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      if (indent === '') {
        // Top-level key
        if (currentKey && currentList) {
          result[currentKey] = currentList;
        }
        currentKey = key;
        currentList = null;
        currentItem = null;
        
        if (value && value !== '|') {
          result[key] = value;
        }
      } else if (indent.length > 0 && currentItem) {
        // Nested property of list item
        currentItem[key] = value;
      }
    }
  }
  
  // Handle remaining system block
  if (inSystemBlock) {
    result.system = systemContent.join('\n').trim();
  }
  
  // Handle remaining list
  if (currentKey && currentList) {
    result[currentKey] = currentList;
  }
  
  return result;
}

/**
 * Load configuration from .copilot/config.yaml
 */
function loadConfig() {
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return parseYAML(content);
  } catch (error) {
    console.error(`Error loading config from ${CONFIG_PATH}:`, error.message);
    return null;
  }
}

/**
 * Load a persona file by name
 */
function loadPersona(personaName) {
  const personaPath = path.join(PERSONAS_DIR, `${personaName}.yaml`);
  
  if (!fs.existsSync(personaPath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(personaPath, 'utf-8');
    return parseYAML(content);
  } catch (error) {
    console.error(`Error loading persona from ${personaPath}:`, error.message);
    return null;
  }
}

/**
 * List all available personas
 */
function listPersonas() {
  try {
    const files = fs.readdirSync(PERSONAS_DIR);
    return files
      .filter(f => f.endsWith('.yaml'))
      .map(f => f.replace('.yaml', ''));
  } catch (error) {
    console.error('Error listing personas:', error.message);
    return [];
  }
}

/**
 * Determine which persona to use based on:
 * 1. CLI flag (--persona)
 * 2. Environment variable (COPILOT_PERSONA)
 * 3. Path mapping (if --file is provided)
 * 4. Default from config
 */
function selectPersona(args, config) {
  // 1. Check CLI flag
  if (args.values.persona) {
    return args.values.persona;
  }
  
  // 2. Check environment variable
  if (process.env.COPILOT_PERSONA) {
    return process.env.COPILOT_PERSONA;
  }
  
  // 3. Check path mapping
  if (args.values.file && config && config.path_mappings) {
    const filePath = args.values.file;
    
    for (const mapping of config.path_mappings) {
      if (typeof mapping === 'object' && mapping.path && mapping.persona) {
        // Convert glob pattern to regex
        // First handle ** and *, then escape other special chars
        let pattern = mapping.path
          .replace(/\*\*/g, '<<<GLOBSTAR>>>')      // Temporarily replace **
          .replace(/\*/g, '<<<STAR>>>')            // Temporarily replace *
          .replace(/[.+?^${}()|[\]\\]/g, '\\$&')   // Escape regex special chars
          .replace(/<<<GLOBSTAR>>>/g, '.*')        // ** matches anything including /
          .replace(/<<<STAR>>>/g, '[^/]*');        // * matches anything except /
        
        const regex = new RegExp(`^${pattern}$`);
        
        if (regex.test(filePath)) {
          return mapping.persona;
        }
      }
    }
  }
  
  // 4. Use default from config
  if (config && config.default_persona) {
    return config.default_persona;
  }
  
  // Fallback
  return 'software_engineer';
}

/**
 * Send a message to OpenAI (example implementation)
 * In a real scenario, you would need to:
 * - Set OPENAI_API_KEY environment variable
 * - Install openai package: npm install openai
 */
async function sendToOpenAI(systemPrompt, userMessage) {
  console.log('\n=== Sending to OpenAI ===');
  console.log('System Prompt Length:', systemPrompt.length, 'characters');
  console.log('User Message:', userMessage);
  console.log('\n--- System Prompt ---');
  console.log(systemPrompt);
  console.log('--- End System Prompt ---\n');
  
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  OPENAI_API_KEY not set. Skipping actual API call.');
    console.log('To make real API calls, set your OpenAI API key:');
    console.log('  export OPENAI_API_KEY=your-api-key-here');
    console.log('\nThen install the OpenAI SDK:');
    console.log('  npm install openai');
    return;
  }
  
  try {
    // Attempt to use OpenAI SDK if available
    const { default: OpenAI } = await import('openai').catch(() => {
      throw new Error('OpenAI SDK not installed. Run: npm install openai');
    });
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    console.log('Making API call to OpenAI...');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    console.log('\n=== OpenAI Response ===');
    console.log(response.choices[0].message.content);
    console.log('======================\n');
    
  } catch (error) {
    console.error('Error calling OpenAI:', error.message);
  }
}

/**
 * Main CLI function
 */
async function main() {
  // Parse command line arguments
  const args = parseArgs({
    options: {
      persona: {
        type: 'string',
        short: 'p',
      },
      file: {
        type: 'string',
        short: 'f',
      },
      list: {
        type: 'boolean',
        short: 'l',
      },
      help: {
        type: 'boolean',
        short: 'h',
      },
    },
    allowPositionals: true,
  });
  
  // Show help
  if (args.values.help) {
    console.log(`
Copilot Persona Chat CLI

Usage:
  node scripts/start-chat.js [options] <message>

Options:
  -p, --persona <name>  Select a specific persona
  -f, --file <path>     File path for context (enables path-based persona mapping)
  -l, --list            List all available personas
  -h, --help            Show this help message

Examples:
  node scripts/start-chat.js "How do I implement authentication?"
  node scripts/start-chat.js --persona cloud_architect "How should I deploy this?"
  node scripts/start-chat.js --file apps/host/src/App.tsx "Review this component"
  COPILOT_PERSONA=devops_engineer node scripts/start-chat.js "Set up CI/CD"

Environment Variables:
  COPILOT_PERSONA       Default persona to use
  OPENAI_API_KEY        OpenAI API key for making actual API calls
    `);
    return;
  }
  
  // List personas
  if (args.values.list) {
    const personas = listPersonas();
    console.log('\nAvailable personas:');
    personas.forEach(p => console.log(`  - ${p}`));
    console.log('');
    return;
  }
  
  // Load config
  const config = loadConfig();
  if (!config) {
    console.error('Failed to load config. Exiting.');
    process.exit(1);
  }
  
  // Select persona
  const personaName = selectPersona(args, config);
  console.log(`Using persona: ${personaName}`);
  
  // Load persona
  const persona = loadPersona(personaName);
  if (!persona) {
    console.error(`Persona '${personaName}' not found.`);
    console.log('\nAvailable personas:');
    listPersonas().forEach(p => console.log(`  - ${p}`));
    process.exit(1);
  }
  
  console.log(`Persona: ${persona.persona_name}`);
  console.log(`Description: ${persona.description}`);
  
  // Get user message
  const userMessage = args.positionals.join(' ');
  if (!userMessage) {
    console.error('\nError: No message provided.');
    console.log('Usage: node scripts/start-chat.js [options] <message>');
    console.log('Try: node scripts/start-chat.js --help');
    process.exit(1);
  }
  
  // Send to OpenAI
  await sendToOpenAI(persona.system, userMessage);
}

// Run the CLI
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
