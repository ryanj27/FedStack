import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface PersonaConfig {
  persona_name: string;
  description: string;
  languages?: string[];
  system: string;
}

interface RepoConfig {
  default_persona?: string;
  path_mappings?: Array<{
    path: string;
    persona: string;
  }>;
}

/**
 * Find the .copilot directory in the workspace
 */
function findCopilotDir(): string | null {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return null;
  }

  // Check the first workspace folder
  const copilotDir = path.join(workspaceFolders[0].uri.fsPath, '.copilot');
  if (fs.existsSync(copilotDir)) {
    return copilotDir;
  }

  return null;
}

/**
 * Load all available personas
 */
function loadPersonas(copilotDir: string): Map<string, PersonaConfig> {
  const personasDir = path.join(copilotDir, 'personas');
  const personas = new Map<string, PersonaConfig>();

  if (!fs.existsSync(personasDir)) {
    return personas;
  }

  const files = fs.readdirSync(personasDir);
  for (const file of files) {
    if (file.endsWith('.yaml') || file.endsWith('.yml')) {
      const filePath = path.join(personasDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const persona = yaml.load(content) as PersonaConfig;
        const personaId = file.replace(/\.(yaml|yml)$/, '');
        personas.set(personaId, persona);
      } catch (error) {
        console.error(`Error loading persona ${file}:`, error);
      }
    }
  }

  return personas;
}

/**
 * Load repository configuration
 */
function loadConfig(copilotDir: string): RepoConfig | null {
  const configPath = path.join(copilotDir, 'config.yaml');
  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return yaml.load(content) as RepoConfig;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

/**
 * Try to open GitHub Copilot Chat with best effort
 */
async function openCopilotChat(): Promise<boolean> {
  // Try common command IDs for GitHub Copilot Chat
  const copilotCommands = [
    'workbench.action.chat.open',
    'github.copilot.openChat',
    'workbench.panel.chat.view.copilot.focus',
    'github.copilot.chat.open',
  ];

  for (const commandId of copilotCommands) {
    try {
      await vscode.commands.executeCommand(commandId);
      return true;
    } catch (error) {
      // Command doesn't exist, try next one
      continue;
    }
  }

  return false;
}

/**
 * Main command to select and use a persona
 */
async function selectPersona() {
  const copilotDir = findCopilotDir();
  if (!copilotDir) {
    vscode.window.showErrorMessage(
      'No .copilot directory found in workspace. Please create persona files first.'
    );
    return;
  }

  const personas = loadPersonas(copilotDir);
  if (personas.size === 0) {
    vscode.window.showErrorMessage(
      'No personas found in .copilot/personas directory.'
    );
    return;
  }

  // Create QuickPick items
  const items: vscode.QuickPickItem[] = [];
  personas.forEach((persona, id) => {
    items.push({
      label: persona.persona_name,
      description: id,
      detail: persona.description,
    });
  });

  // Show QuickPick
  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a Copilot persona',
    matchOnDescription: true,
    matchOnDetail: true,
  });

  if (!selected || !selected.description) {
    return;
  }

  const personaId = selected.description;
  const persona = personas.get(personaId);
  if (!persona) {
    return;
  }

  // Copy system prompt to clipboard
  await vscode.env.clipboard.writeText(persona.system);

  // Try to open Copilot Chat
  const chatOpened = await openCopilotChat();

  // Show success message
  if (chatOpened) {
    vscode.window.showInformationMessage(
      `Persona "${persona.persona_name}" system prompt copied to clipboard and Copilot Chat opened. Paste the prompt to start chatting!`
    );
  } else {
    vscode.window.showInformationMessage(
      `Persona "${persona.persona_name}" system prompt copied to clipboard. Open Copilot Chat and paste to start!`
    );
  }
}

/**
 * Activate the extension
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Copilot Personas extension is now active');

  // Register the select persona command
  const selectPersonaCommand = vscode.commands.registerCommand(
    'copilot-personas.selectPersona',
    selectPersona
  );

  context.subscriptions.push(selectPersonaCommand);

  // Show a welcome message on first activation
  const copilotDir = findCopilotDir();
  if (copilotDir) {
    const personas = loadPersonas(copilotDir);
    console.log(`Found ${personas.size} Copilot personas`);
  }
}

/**
 * Deactivate the extension
 */
export function deactivate() {
  console.log('Copilot Personas extension is now deactivated');
}
