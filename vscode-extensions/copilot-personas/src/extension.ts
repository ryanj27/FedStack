import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface PersonaConfig {
  persona_name: string;
  description: string;
  primary_language: string;
  languages: string[];
  specialties: string[];
  system: string;
}

interface Config {
  default_persona?: string;
  path_mappings?: Record<string, string>;
}

let lastPersona: { id: string; content: string } | null = null;

/**
 * Load all personas from the .copilot/personas directory
 */
function loadPersonas(workspaceRoot: string): Map<string, PersonaConfig> {
  const personasDir = path.join(workspaceRoot, '.copilot', 'personas');
  const personas = new Map<string, PersonaConfig>();

  if (!fs.existsSync(personasDir)) {
    return personas;
  }

  const files = fs.readdirSync(personasDir).filter(f => f.endsWith('.yaml'));

  for (const file of files) {
    const personaId = path.basename(file, '.yaml');
    const filePath = path.join(personasDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const personaConfig = yaml.load(content) as PersonaConfig;
      personas.set(personaId, personaConfig);
    } catch (error) {
      console.error(`Error parsing persona file ${file}:`, error);
    }
  }

  return personas;
}

/**
 * Load config from .copilot/config.yaml
 */
function loadConfig(workspaceRoot: string): Config {
  const configPath = path.join(workspaceRoot, '.copilot', 'config.yaml');

  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return yaml.load(content) as Config;
  } catch (error) {
    console.error('Error loading config:', error);
    return {};
  }
}

/**
 * Get the default persona based on workspace settings and config
 */
function getDefaultPersona(workspaceRoot: string): string | null {
  // Check workspace setting first
  const config = vscode.workspace.getConfiguration('copilotPersonas');
  const workspaceSetting = config.get<string>('defaultPersona');
  
  if (workspaceSetting && workspaceSetting.trim()) {
    return workspaceSetting.trim();
  }

  // Fall back to .copilot/config.yaml
  const copilotConfig = loadConfig(workspaceRoot);
  return copilotConfig.default_persona || null;
}

/**
 * Format persona content for copying to clipboard
 */
function formatPersonaContent(persona: PersonaConfig): string {
  return persona.system || '';
}

/**
 * Show persona QuickPick and copy to clipboard
 */
async function selectPersona(context: vscode.ExtensionContext, openChat: boolean = false): Promise<void> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage('No workspace folder open');
    return;
  }

  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const personas = loadPersonas(workspaceRoot);

  if (personas.size === 0) {
    vscode.window.showWarningMessage('No personas found in .copilot/personas/');
    return;
  }

  // Create QuickPick items
  const items: vscode.QuickPickItem[] = [];
  const defaultPersonaId = getDefaultPersona(workspaceRoot);

  for (const [id, persona] of personas.entries()) {
    const isDefault = id === defaultPersonaId;
    items.push({
      label: isDefault ? `$(star) ${id}` : id,
      description: persona.persona_name,
      detail: persona.description
    });
  }

  // Sort items: default first, then alphabetically
  items.sort((a, b) => {
    const aIsDefault = a.label.startsWith('$(star)');
    const bIsDefault = b.label.startsWith('$(star)');
    
    if (aIsDefault && !bIsDefault) return -1;
    if (!aIsDefault && bIsDefault) return 1;
    
    const aLabel = a.label.replace('$(star) ', '');
    const bLabel = b.label.replace('$(star) ', '');
    return aLabel.localeCompare(bLabel);
  });

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a persona to copy to clipboard',
    matchOnDescription: true,
    matchOnDetail: true
  });

  if (selected) {
    const personaId = selected.label.replace('$(star) ', '');
    const persona = personas.get(personaId);
    
    if (persona) {
      const content = formatPersonaContent(persona);
      await vscode.env.clipboard.writeText(content);
      
      // Store last persona
      lastPersona = { id: personaId, content };
      await context.workspaceState.update('lastPersona', { id: personaId, content });

      vscode.window.showInformationMessage(
        `Persona "${persona.persona_name}" copied to clipboard`
      );

      if (openChat) {
        // Open GitHub Copilot Chat
        await vscode.commands.executeCommand('workbench.action.chat.open');
      }
    }
  }
}

/**
 * Re-copy the last used persona
 */
async function recopyLastPersona(context: vscode.ExtensionContext): Promise<void> {
  const stored = context.workspaceState.get<{ id: string; content: string }>('lastPersona');
  
  if (!stored || !lastPersona) {
    vscode.window.showWarningMessage('No persona has been copied yet');
    return;
  }

  await vscode.env.clipboard.writeText(stored.content);
  vscode.window.showInformationMessage(`Persona "${stored.id}" re-copied to clipboard`);
}

/**
 * Auto-copy default persona on startup
 */
async function autoCopyDefaultPersona(context: vscode.ExtensionContext): Promise<void> {
  const config = vscode.workspace.getConfiguration('copilotPersonas');
  const autoCopy = config.get<boolean>('autoCopyOnOpen');
  
  if (!autoCopy) {
    return;
  }

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return;
  }

  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const defaultPersonaId = getDefaultPersona(workspaceRoot);
  
  if (!defaultPersonaId) {
    return;
  }

  const personas = loadPersonas(workspaceRoot);
  const persona = personas.get(defaultPersonaId);
  
  if (persona) {
    const content = formatPersonaContent(persona);
    await vscode.env.clipboard.writeText(content);
    
    // Store last persona
    lastPersona = { id: defaultPersonaId, content };
    await context.workspaceState.update('lastPersona', { id: defaultPersonaId, content });

    vscode.window.showInformationMessage(
      `Default persona "${persona.persona_name}" automatically copied to clipboard`,
      'Open Chat'
    ).then(selection => {
      if (selection === 'Open Chat') {
        vscode.commands.executeCommand('workbench.action.chat.open');
      }
    });
  }
}

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Copilot Personas extension is now active');

  // Restore last persona from workspace state
  const stored = context.workspaceState.get<{ id: string; content: string }>('lastPersona');
  if (stored) {
    lastPersona = stored;
  }

  // Auto-copy on startup
  autoCopyDefaultPersona(context);

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('copilotPersonas.selectPersona', () => {
      selectPersona(context, false);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copilotPersonas.selectAndOpenChat', () => {
      selectPersona(context, true);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copilotPersonas.recopyLastPersona', () => {
      recopyLastPersona(context);
    })
  );
}

/**
 * Extension deactivation
 */
export function deactivate() {
  // Clean up if needed
}
