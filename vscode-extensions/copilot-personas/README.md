# Copilot Personas VS Code Extension

Quick access to repository-level Copilot personas with workspace defaults and auto-copy-on-open functionality.

## Features

- **QuickPick Selection**: Browse and select from available personas in `.copilot/personas/`
- **Clipboard Copy**: Automatically copies the selected persona's system prompt to clipboard
- **Workspace Settings**: Configure default persona and auto-copy behavior per workspace
- **Persistent State**: Remembers your last-used persona
- **Keyboard Shortcut**: Press `Ctrl+Alt+P` (or `Cmd+Alt+P` on Mac) to select and open chat
- **Auto-Copy on Open**: Optionally copy default persona to clipboard when VS Code opens

## Usage

### Commands

Available via Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

1. **Copilot Personas: Select Persona** - Opens QuickPick to select and copy a persona
2. **Copilot Personas: Select Persona and Open Chat** - Select, copy, and open GitHub Copilot Chat
3. **Copilot Personas: Re-copy Last Persona** - Re-copy the last used persona to clipboard

### Keyboard Shortcut

- **Windows/Linux**: `Ctrl+Alt+P`
- **macOS**: `Cmd+Alt+P`

Opens QuickPick to select a persona and automatically opens GitHub Copilot Chat.

### Workspace Settings

Configure in `.vscode/settings.json` or via Settings UI:

```json
{
  "copilotPersonas.defaultPersona": "principal_software_engineer",
  "copilotPersonas.autoCopyOnOpen": true
}
```

#### Settings Reference

- **`copilotPersonas.defaultPersona`** (string, default: `""`)
  - Default persona to use (filename without `.yaml` extension)
  - If empty, uses the `default_persona` from `.copilot/config.yaml`
  - Marked with a star (⭐) in the QuickPick list

- **`copilotPersonas.autoCopyOnOpen`** (boolean, default: `false`)
  - Automatically copy the default persona to clipboard when VS Code opens
  - Shows a notification with option to open chat

## Installation

### From VSIX (Recommended)

1. Download the `.vsix` file from GitHub Actions workflow artifacts:
   - Go to the repository's **Actions** tab
   - Click on the latest successful **Package VS Code Extension** workflow run
   - Download the `copilot-personas-vsix` artifact
   - Extract the `.vsix` file from the downloaded ZIP

2. Install in VS Code:
   ```bash
   code --install-extension copilot-personas-0.1.0.vsix
   ```

   Or via VS Code UI:
   - Open VS Code
   - Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Click the `...` menu at the top of the Extensions view
   - Select **Install from VSIX...**
   - Choose the downloaded `.vsix` file

### From Source

1. Navigate to the extension directory:
   ```bash
   cd vscode-extensions/copilot-personas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npm run compile
   ```

4. Package the extension:
   ```bash
   npm run package:vsix
   ```

5. Install the generated `.vsix` file

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Building

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Package as VSIX
npm run package:vsix
```

### Testing Locally

1. Open the extension directory in VS Code
2. Press `F5` to launch Extension Development Host
3. Test commands in the new VS Code window

## CI/CD

The extension is automatically packaged by GitHub Actions on every push. The workflow:

1. Installs dependencies
2. Compiles TypeScript
3. Runs `vsce package`
4. Uploads `.vsix` as an artifact named `copilot-personas-vsix`

## Persona Files

Persona files do **not contain secrets**. They are YAML configuration files that define:

- Persona name and description
- Primary language and supported languages
- Specialties and focus areas
- System prompt for the LLM

Example persona structure:

```yaml
persona_name: "Principal+ Software Engineer"
description: "Principal+ software engineer with deep TypeScript/C# experience"
primary_language: "TypeScript / C#"
languages:
  - "TypeScript"
  - "JavaScript"
  - "C#"
specialties:
  - "API design"
  - "system reliability"
system: |
  You are a Principal+ Software Engineer...
```

## License

MIT
