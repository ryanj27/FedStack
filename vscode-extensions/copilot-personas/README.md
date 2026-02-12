# Copilot Personas VS Code Extension

A VS Code extension that makes it easy to use repository-defined Copilot personas in your editor.

## Features

- **Quick Persona Selection**: Use the command palette to select from available personas
- **Clipboard Integration**: Automatically copies the persona's system prompt to your clipboard
- **Copilot Chat Integration**: Attempts to open GitHub Copilot Chat automatically (best effort)
- **Repository-Based**: Reads persona definitions from `.copilot/personas/` in your workspace

## Usage

1. **Install the Extension** (or run in development mode)
2. **Open a workspace** that contains a `.copilot/personas/` directory with persona YAML files
3. **Select a Persona**:
   - Use the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type "Select Copilot Persona"
   - Or use the keyboard shortcut: `Ctrl+Shift+P Ctrl+Shift+C` (Mac: `Cmd+Shift+P Cmd+Shift+C`)
4. **Choose from available personas** in the quick pick menu
5. **The system prompt is copied to clipboard** and Copilot Chat opens (if available)
6. **Paste the prompt** into Copilot Chat to start a conversation with that persona

## Persona File Format

Personas are defined in YAML files in `.copilot/personas/`:

```yaml
persona_name: Software Engineer
description: Expert in implementing features and writing clean code
languages:
  - TypeScript
  - JavaScript
  - React

system: |
  You are an expert Software Engineer...
  [Full system prompt here]
```

## Configuration

The extension automatically discovers persona files from `.copilot/personas/` in your workspace root.

You can also define a repository configuration in `.copilot/config.yaml`:

```yaml
default_persona: software_engineer

path_mappings:
  - path: "apps/**"
    persona: software_engineer
  - path: "*.md"
    persona: software_architect
```

## Development

### Prerequisites

- Node.js 18+
- VS Code

### Build

```bash
cd vscode-extensions/copilot-personas
npm install
npm run compile
```

### Run in Development

1. Open the `vscode-extensions/copilot-personas` folder in VS Code
2. Press F5 to launch the Extension Development Host
3. Test the extension in the new VS Code window

### Package

```bash
npm install -g @vscode/vsce
vsce package
```

This creates a `.vsix` file you can install in VS Code.

## Requirements

- VS Code 1.80.0 or higher
- A workspace with `.copilot/personas/` directory containing persona YAML files
- (Optional) GitHub Copilot extension for chat integration

## Known Limitations

- Copilot Chat opening is best-effort and depends on GitHub Copilot being installed
- The system prompt must be manually pasted into the chat
- No automatic injection of prompts into Copilot (this is by design for transparency)

## Contributing

This extension is part of the fedstack repository. Contributions are welcome!

## License

MIT
