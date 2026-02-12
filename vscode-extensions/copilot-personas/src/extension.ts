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
