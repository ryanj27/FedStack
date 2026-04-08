# Copilot Personas - VS Code Extension

A VS Code extension that provides workspace-level persona management for GitHub Copilot. Load predefined personas and copy their system prompts to your clipboard for use in Copilot Chat.

## Features

- 📋 **Persona Selection**: Browse and select from available personas in your workspace
- 🔄 **Auto-Copy on Open**: Automatically copy your default persona when opening the workspace
- ⌨️ **Quick Access**: Use keyboard shortcuts to quickly select personas
- 💾 **Remember Last Persona**: Re-copy your last used persona with a single command
- 🎯 **Path-Based Defaults**: Configure different default personas for different directories

## Usage

### Commands

This extension provides three commands accessible via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

1. **Copilot Personas: Select Persona** (`Ctrl+Alt+P` / `Cmd+Alt+P`)
   - Opens a QuickPick menu to select a persona
   - Copies the persona's system prompt to your clipboard
   - You can then paste it into Copilot Chat

2. **Copilot Personas: Select Persona and Open Chat**
   - Same as above, but also attempts to open Copilot Chat automatically
   - (Note: Opening chat is best-effort and may not work in all VS Code versions)

3. **Copilot Personas: Recopy Last Persona**
   - Re-copies your last selected persona to the clipboard
   - Useful when you need to start a new chat with the same persona

### Workspace Settings

Configure these settings in your workspace settings (`.vscode/settings.json`):

```json
{
  "copilotPersonas.defaultPersona": "software_engineer",
  "copilotPersonas.autoCopyOnOpen": true
}
```

#### `copilotPersonas.defaultPersona`

- **Type**: `string`
- **Default**: `""`
- **Description**: The persona ID to use as default (e.g., `"software_engineer"`)

#### `copilotPersonas.autoCopyOnOpen`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Automatically copy the default persona to clipboard when workspace is opened

### Persona Files

Personas are defined in YAML files located in `.copilot/personas/` in your workspace root.

Example persona file (`.copilot/personas/software_engineer.yaml`):

```yaml
persona_name: "Software Engineer"
description: "Principal+ software engineer; TypeScript specialist"
primary_language: "TypeScript"
languages:
  - "TypeScript"
  - "JavaScript"
specialties:
  - "API design"
  - "unit testing"
system: |
  You are a Principal+ software engineer with expert-level experience.
  Prefer TypeScript, include type annotations, and write small focused tests.
```

## Installation

### From VSIX File

1. Download the `.vsix` file from the GitHub Actions workflow artifacts
2. In VS Code, go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Click the `...` menu at the top of the Extensions view
4. Select "Install from VSIX..."
5. Choose the downloaded `.vsix` file

### From Source

1. Clone the repository
2. Navigate to `vscode-extensions/copilot-personas/`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Press `F5` in VS Code to open a new window with the extension loaded

## Building and Packaging

### Development Build

```bash
cd vscode-extensions/copilot-personas
npm install
npm run compile
```

### Package VSIX

```bash
npm run package:vsix
```

This creates a `.vsix` file in the extension directory that can be installed in VS Code.

### CI/CD Workflow

The extension is automatically packaged by a GitHub Actions workflow (`.github/workflows/package-vsix.yaml`) on every push and pull request.

To download the packaged extension:

1. Go to the Actions tab in GitHub
2. Click on the latest workflow run
3. Scroll down to "Artifacts"
4. Download `copilot-personas-vsix`
5. Extract the `.vsix` file and install it in VS Code

## How It Works

Due to limitations in the VS Code extension API, this extension cannot directly inject text into the Copilot Chat UI. Instead, it uses a **clipboard-based approach**:

1. When you select a persona, its system prompt is copied to your clipboard
2. You manually paste it into Copilot Chat (or it's automatically included if you start a new chat)
3. The persona context is then used for all subsequent messages in that chat session

This is a pragmatic workaround until GitHub provides a proper API for setting Copilot Chat context.

## Tips

- Set `autoCopyOnOpen` to `true` and configure a `defaultPersona` to streamline your workflow
- Use the keyboard shortcut (`Ctrl+Alt+P` / `Cmd+Alt+P`) for quick persona switching
- Configure different personas for different directories using the `.copilot/config.yaml` path mappings
- Use `Recopy Last Persona` when starting a new chat session with the same persona

## Troubleshooting

**Issue**: Personas not showing up

- Ensure `.copilot/personas/` directory exists in your workspace root
- Check that persona files have `.yaml` or `.yml` extension
- Verify YAML syntax is correct

**Issue**: Auto-copy not working

- Check that both `autoCopyOnOpen` and `defaultPersona` are set in workspace settings
- Verify the default persona ID matches the filename (without `.yaml`)
- Reload the VS Code window after changing settings

**Issue**: Can't open Copilot Chat automatically

- This is a known limitation - the command IDs may vary by VS Code version
- Simply open Copilot Chat manually and paste the persona prompt

## License

MIT
