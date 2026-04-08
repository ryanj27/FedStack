import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface Persona {
  id: string;
  persona_name: string;
  description: string;
  primary_language: string;
  languages: string[];
  specialties?: string[];
  system: string;
}

interface PersonaConfig {
  default_persona?: string;
  path_mappings?: Record<string, string>;
}

/**
 * VS Code Extension: Copilot Personas
 * 
 * This extension provides workspace-level persona management for GitHub Copilot.
 * 
 * KEY FEATURES:
 * - Load persona files from .copilot/personas/*.yaml
 * - Copy persona system prompts to clipboard for use in Copilot Chat
 * - Workspace settings for default persona and auto-copy on open
 * - Commands to select and manage personas
 * 
 * CLIPBOARD APPROACH:
 * Due to limitations in the VS Code API, we cannot directly inject text into the 
 * Copilot Chat UI. Instead, we copy the persona system prompt to the clipboard,
 * and users can paste it into their chat manually. This is a pragmatic workaround
 * until a proper API for Copilot Chat context becomes available.
 * 
 * WORKSPACE SETTINGS:
 * - copilotPersonas.defaultPersona: The persona ID to use by default (e.g., 'software_engineer')
 * - copilotPersonas.autoCopyOnOpen: If true, automatically copies default persona on workspace open
 * 
 * COMMANDS:
 * - copilotPersonas.selectPersona: Show QuickPick to select and copy a persona
 * - copilotPersonas.selectAndOpenChat: Select persona, copy to clipboard, then open Copilot Chat
 * - copilotPersonas.recopyLastPersona: Re-copy the last selected persona to clipboard
 */

let workspaceState: vscode.Memento;

export function activate(context: vscode.ExtensionContext) {
  console.log('Copilot Personas extension is now active');

  workspaceState = context.workspaceState;

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotPersonas.selectPersona', selectPersona)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copilotPersonas.selectAndOpenChat', selectAndOpenChat)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copilotPersonas.recopyLastPersona', recopyLastPersona)
  );

  // Handle auto-copy on workspace open
  handleAutoCopyOnOpen(context);
}

export function deactivate() {}

/**
 * Handle automatic persona copy when workspace is opened
 */
async function handleAutoCopyOnOpen(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('copilotPersonas');
  const autoCopyOnOpen = config.get<boolean>('autoCopyOnOpen', false);
  const defaultPersonaId = config.get<string>('defaultPersona', '');

  if (autoCopyOnOpen && defaultPersonaId) {
    const personas = await loadPersonas();
    const persona = personas.find(p => p.id === defaultPersonaId);

    if (persona) {
      await vscode.env.clipboard.writeText(persona.system);
      vscode.window.showInformationMessage(
        `✓ Auto-copied default persona: ${persona.persona_name}`
      );
    } else {
      vscode.window.showWarningMessage(
        `Default persona '${defaultPersonaId}' not found. Please check your settings.`
      );
    }
  }
}

/**
 * Load all persona files from .copilot/personas/
 */
async function loadPersonas(): Promise<Persona[]> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage('No workspace folder is open');
    return [];
  }

  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const personasDir = path.join(workspaceRoot, '.copilot', 'personas');

  if (!fs.existsSync(personasDir)) {
    vscode.window.showErrorMessage(
      'Personas directory not found. Expected: .copilot/personas/'
    );
    return [];
  }

  const files = fs.readdirSync(personasDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  const personas: Persona[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(personasDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = yaml.load(content) as Persona;
      data.id = path.basename(file, path.extname(file));
      personas.push(data);
    } catch (error) {
      console.error(`Error loading persona file ${file}:`, error);
    }
  }

  return personas;
}

/**
 * Load persona configuration from .copilot/config.yaml
 */
async function loadConfig(): Promise<PersonaConfig> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return {};
  }

  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const configFile = path.join(workspaceRoot, '.copilot', 'config.yaml');

  if (!fs.existsSync(configFile)) {
    return {};
  }

  try {
    const content = fs.readFileSync(configFile, 'utf-8');
    return yaml.load(content) as PersonaConfig;
  } catch (error) {
    console.error('Error loading config:', error);
    return {};
  }
}

/**
 * Command: Select a persona from QuickPick and copy to clipboard
 */
async function selectPersona() {
  const personas = await loadPersonas();

  if (personas.length === 0) {
    vscode.window.showErrorMessage('No personas found in .copilot/personas/');
    return;
  }

  const items = personas.map(persona => ({
    label: persona.persona_name,
    description: persona.id,
    detail: persona.description,
    persona,
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a persona to copy to clipboard',
  });

  if (selected) {
    await copyPersonaToClipboard(selected.persona);
  }
}

/**
 * Command: Select persona, copy to clipboard, then open Copilot Chat
 */
async function selectAndOpenChat() {
  const personas = await loadPersonas();

  if (personas.length === 0) {
    vscode.window.showErrorMessage('No personas found in .copilot/personas/');
    return;
  }

  const items = personas.map(persona => ({
    label: persona.persona_name,
    description: persona.id,
    detail: persona.description,
    persona,
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a persona',
  });

  if (selected) {
    await copyPersonaToClipboard(selected.persona);

    // Attempt to open Copilot Chat
    // These are best-effort attempts as the command IDs may vary
    try {
      // Try common Copilot Chat command IDs
      await vscode.commands.executeCommand('workbench.action.chat.open');
    } catch (error) {
      try {
        await vscode.commands.executeCommand('github.copilot.chat.open');
      } catch (error2) {
        vscode.window.showInformationMessage(
          'Could not automatically open Copilot Chat. Please open it manually and paste the persona prompt.'
        );
      }
    }
  }
}

/**
 * Command: Re-copy the last selected persona to clipboard
 */
async function recopyLastPersona() {
  const lastPersonaId = workspaceState.get<string>('lastPersonaId');

  if (!lastPersonaId) {
    vscode.window.showInformationMessage('No previous persona found. Please select one first.');
    return;
  }

  const personas = await loadPersonas();
  const persona = personas.find(p => p.id === lastPersonaId);

  if (persona) {
    await copyPersonaToClipboard(persona);
  } else {
    vscode.window.showErrorMessage(
      `Previously selected persona '${lastPersonaId}' not found.`
    );
  }
}

/**
 * Copy a persona's system prompt to clipboard and save state
 */
async function copyPersonaToClipboard(persona: Persona) {
  await vscode.env.clipboard.writeText(persona.system);
  await workspaceState.update('lastPersonaId', persona.id);

  vscode.window.showInformationMessage(
    `✓ Copied ${persona.persona_name} to clipboard. Paste into Copilot Chat to use this persona.`
  );
}
