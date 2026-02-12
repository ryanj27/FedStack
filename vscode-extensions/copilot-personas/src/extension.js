const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

let autoCopyDone = false;

/**
 * Discover all persona files in the .copilot/personas directory
 */
function discoverPersonas(workspaceRoot) {
  const personasDir = path.join(workspaceRoot, '.copilot', 'personas');
  
  if (!fs.existsSync(personasDir)) {
    return [];
  }

  const files = fs.readdirSync(personasDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  const personas = [];

  for (const file of files) {
    try {
      const filePath = path.join(personasDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const persona = yaml.load(content);
      persona.id = path.basename(file, path.extname(file));
      personas.push(persona);
    } catch (error) {
      console.error(`Error loading persona file ${file}:`, error);
    }
  }

  return personas;
}

/**
 * Copy persona system prompt to clipboard
 */
async function copyPersonaToClipboard(persona, context) {
  const systemPrompt = persona.system || 'You are a helpful assistant.';
  
  try {
    await vscode.env.clipboard.writeText(systemPrompt);
    
    // Store last selected persona in workspace state
    if (context && context.workspaceState) {
      await context.workspaceState.update('lastSelectedPersona', persona.id);
    }
    
    vscode.window.showInformationMessage(
      `✅ Copied "${persona.persona_name || persona.id}" system prompt to clipboard`
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to copy to clipboard: ${error.message}`);
  }
}

/**
 * Show quick pick to select a persona
 */
async function selectPersona(context, workspaceRoot) {
  const personas = discoverPersonas(workspaceRoot);

  if (personas.length === 0) {
    vscode.window.showWarningMessage('No personas found in .copilot/personas directory');
    return null;
  }

  const items = personas.map(p => ({
    label: p.persona_name || p.id,
    description: p.primary_language || '',
    detail: p.description || '',
    persona: p
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a persona to copy to clipboard',
    matchOnDescription: true,
    matchOnDetail: true
  });

  if (selected) {
    await copyPersonaToClipboard(selected.persona, context);
    return selected.persona;
  }

  return null;
}

/**
 * Handle auto-copy on workspace open
 */
async function handleAutoCopyOnOpen(context, workspaceRoot) {
  // Only run once per session
  if (autoCopyDone) {
    return;
  }

  const config = vscode.workspace.getConfiguration('copilotPersonas');
  const autoCopyEnabled = config.get('autoCopyOnOpen', false);
  const defaultPersonaId = config.get('defaultPersona', '');

  if (!autoCopyEnabled || !defaultPersonaId) {
    return;
  }

  const personas = discoverPersonas(workspaceRoot);
  const defaultPersona = personas.find(p => p.id === defaultPersonaId);

  if (defaultPersona) {
    await copyPersonaToClipboard(defaultPersona, context);
    autoCopyDone = true;
  } else {
    console.warn(`Default persona "${defaultPersonaId}" not found`);
  }
}

/**
 * Activate the extension
 */
function activate(context) {
  console.log('Copilot Personas extension is now active');

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    console.log('No workspace folder found');
    return;
  }

  const workspaceRoot = workspaceFolders[0].uri.fsPath;

  // Handle auto-copy on workspace open
  handleAutoCopyOnOpen(context, workspaceRoot);

  // Command: Select Persona
  let selectPersonaCmd = vscode.commands.registerCommand('copilotPersonas.selectPersona', async () => {
    await selectPersona(context, workspaceRoot);
  });

  // Command: Select Persona and Open Chat
  let selectAndOpenChatCmd = vscode.commands.registerCommand('copilotPersonas.selectAndOpenChat', async () => {
    const persona = await selectPersona(context, workspaceRoot);
    
    if (persona) {
      // Try to open GitHub Copilot Chat (best-effort)
      try {
        // This is a best-effort attempt. The command may not be available if Copilot is not installed.
        await vscode.commands.executeCommand('github.copilot.openChat');
      } catch (error) {
        // Silently fail if Copilot Chat is not available
        console.log('Could not open Copilot Chat:', error.message);
        vscode.window.showInformationMessage(
          'System prompt copied. Open Copilot Chat manually to use it.'
        );
      }
    }
  });

  // Command: Recopy Last Persona
  let recopyLastPersonaCmd = vscode.commands.registerCommand('copilotPersonas.recopyLastPersona', async () => {
    const lastPersonaId = context.workspaceState.get('lastSelectedPersona');
    
    if (!lastPersonaId) {
      vscode.window.showWarningMessage('No previous persona selection found');
      return;
    }

    const personas = discoverPersonas(workspaceRoot);
    const lastPersona = personas.find(p => p.id === lastPersonaId);

    if (lastPersona) {
      await copyPersonaToClipboard(lastPersona, context);
    } else {
      vscode.window.showWarningMessage(`Persona "${lastPersonaId}" not found`);
    }
  });

  context.subscriptions.push(selectPersonaCmd);
  context.subscriptions.push(selectAndOpenChatCmd);
  context.subscriptions.push(recopyLastPersonaCmd);
}

/**
 * Deactivate the extension
 */
function deactivate() {
  console.log('Copilot Personas extension is now deactivated');
}

module.exports = {
  activate,
  deactivate
};
