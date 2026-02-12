# Copilot Personas VS Code Extension

A VS Code extension that loads Copilot persona system prompts from `.copilot/personas/` and copies them to the clipboard for use with GitHub Copilot Chat or other AI assistants.

## Features

- 📋 **Quick Persona Selection**: Use `Ctrl+Alt+P` to quickly select and copy a persona system prompt
- 🤖 **Open Copilot Chat**: Select a persona and automatically open GitHub Copilot Chat
- 🔄 **Re-copy Last Persona**: Quickly re-copy the last used persona
- ⚙️ **Workspace Settings**: Configure default persona and auto-copy behavior
- 🚀 **Auto-copy on Open**: Automatically copy your default persona when opening a workspace

## Commands

All commands are available through the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- **Copilot Personas: Select Persona** (`Ctrl+Alt+P`)
  - Opens a quick pick menu to select a persona
  - Copies the selected persona's system prompt to clipboard

- **Copilot Personas: Select Persona and Open Chat**
  - Same as above, but also attempts to open GitHub Copilot Chat
  - Falls back gracefully if Copilot is not installed

- **Copilot Personas: Recopy Last Persona**
  - Re-copies the last selected persona without showing the picker
  - Useful for quickly switching between chats with the same persona

## Workspace Settings

Configure the extension behavior in your workspace settings (`.vscode/settings.json` or User Settings):

```json
{
  "copilotPersonas.defaultPersona": "principal_software_engineer",
  "copilotPersonas.autoCopyOnOpen": true
}
```

### Available Settings

- **`copilotPersonas.defaultPersona`** (string, default: `""`)
  - The ID of the default persona to use (e.g., `"principal_software_engineer"`)
  - If set and `autoCopyOnOpen` is enabled, this persona will be copied automatically

- **`copilotPersonas.autoCopyOnOpen`** (boolean, default: `false`)
  - When enabled, automatically copies the default persona to clipboard when opening the workspace
  - Only runs once per VS Code session
  - Requires `defaultPersona` to be set

## Usage

### Basic Usage

1. Press `Ctrl+Alt+P` (or run the "Select Persona" command)
2. Choose a persona from the list
3. The system prompt is copied to your clipboard
4. Open GitHub Copilot Chat and paste the prompt to start chatting with that persona

### With Auto-Copy

1. Set your preferred default persona in workspace settings:
   ```json
   {
     "copilotPersonas.defaultPersona": "principal_frontend_engineer",
     "copilotPersonas.autoCopyOnOpen": true
   }
   ```
2. When you open the workspace, the persona prompt is automatically copied
3. Open Copilot Chat and paste to begin

### Re-using Last Persona

If you need to start a new chat with the same persona:

1. Run "Copilot Personas: Recopy Last Persona"
2. The last-used persona is copied again without showing the picker

## Building and Packaging

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install Dependencies

```bash
cd vscode-extensions/copilot-personas
npm install
```

Or with pnpm:

```bash
pnpm install
```

### Package the Extension

To create a `.vsix` file that can be installed in VS Code:

```bash
npm run package:vsix
```

Or:

```bash
npx vsce package
```

This creates a `copilot-personas-0.1.0.vsix` file in the current directory.

### Install the Extension

1. Open VS Code
2. Go to Extensions view (`Ctrl+Shift+X`)
3. Click the "..." menu in the top-right
4. Select "Install from VSIX..."
5. Choose the `.vsix` file

Or from the command line:

```bash
code --install-extension copilot-personas-0.1.0.vsix
```

## Downloading from CI Artifacts

When changes are pushed to the `copilot/personas` branch, a GitHub Actions workflow automatically builds and packages the extension.

To download the `.vsix` artifact:

1. Go to the [Actions tab](../../actions) in the GitHub repository
2. Click on the latest "Package VS Code Extension" workflow run
3. Scroll down to the "Artifacts" section
4. Download the `copilot-personas-vsix` artifact
5. Extract the `.vsix` file from the downloaded ZIP
6. Install using the instructions above

## Persona Files

Personas are stored in `.copilot/personas/` as YAML files. Each persona must include:

- `persona_name`: Display name
- `description`: Short description
- `system`: The system prompt text (used for LLM context)

Example persona structure:

```yaml
persona_name: "Principal+ Software Engineer"
description: "Principal+ software engineer with deep TypeScript/JavaScript expertise"
primary_language: "TypeScript / JavaScript"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
specialties:
  - "API design"
  - "system reliability"
system: |
  You are a Principal+ Software Engineer with extensive experience...
  [full system prompt here]
```

## Troubleshooting

### No personas found

Make sure:
- You have a `.copilot/personas/` directory in your workspace root
- The directory contains `.yaml` or `.yml` files
- The persona files are valid YAML

### Auto-copy not working

Verify:
- `copilotPersonas.autoCopyOnOpen` is set to `true`
- `copilotPersonas.defaultPersona` is set to a valid persona ID
- The persona ID matches a file in `.copilot/personas/` (without the `.yaml` extension)

### Copilot Chat not opening

The "Select Persona and Open Chat" command tries to open GitHub Copilot Chat, but this requires:
- GitHub Copilot extension to be installed
- GitHub Copilot Chat to be enabled

If Copilot is not available, the system prompt is still copied to your clipboard. You can manually open any chat interface and paste it.

## License

MIT
