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
