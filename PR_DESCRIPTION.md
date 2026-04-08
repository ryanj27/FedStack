# Add Copilot Persona Support

This PR adds comprehensive Copilot persona support to the repository, including configuration files, a CLI tool, a VS Code extension, and automated packaging via GitHub Actions.

## What Was Added

### 1. Persona Configuration (`.copilot/`)

**`.copilot/config.yaml`**
- Default persona: `software_engineer`
- Path mappings to automatically select personas based on directory:
  - `infrastructure/` → `devops_engineer`
  - `infra/` → `devops_engineer`
  - `packages/cloud/` → `cloud_architect`
  - `packages/frontend/` → `software_engineer`

**`.copilot/personas/*.yaml`** (4 persona files)
- `software_engineer.yaml` - Principal+ software engineer; TypeScript specialist
- `software_architect.yaml` - High-level design, component boundaries, scalability
- `cloud_architect.yaml` - Cloud architecture, IaC, cost/perf tradeoffs
- `devops_engineer.yaml` - CI/CD, automation, observability

Each persona includes:
- Persona name and description
- Primary language and supported languages
- Specialties
- System prompt for AI chat context

### 2. CLI Tool (`scripts/start-chat.js`)

A Node.js 18+ CLI script for selecting and using personas with AI chat.

**Features:**
- Discovers personas from `.copilot/personas/`
- Reads configuration from `.copilot/config.yaml`
- Selects persona by priority:
  1. CLI flag `--persona`
  2. Environment variable `COPILOT_PERSONA`
  3. Path mapping (based on current directory)
  4. Config default
  5. Single-file fallback
  6. First persona alphabetically
- Supports `--list` to view all personas
- Supports `--interactive` mode for guided selection
- Integrates with OpenAI chat completions API (requires `OPENAI_API_KEY`)
- Includes clear instructions for changing LLM providers

**Usage:**
```bash
# List personas
node scripts/start-chat.js --list

# Chat with specific persona
node scripts/start-chat.js --persona devops_engineer "How do I set up CI/CD?"

# Interactive mode
node scripts/start-chat.js --interactive
```

### 3. VS Code Extension (`vscode-extensions/copilot-personas/`)

A minimal VS Code extension for managing and using personas.

**Features:**
- Loads persona files from `.copilot/personas/*.yaml`
- Copies persona system prompts to clipboard
- Workspace settings:
  - `copilotPersonas.defaultPersona` - Default persona ID
  - `copilotPersonas.autoCopyOnOpen` - Auto-copy on workspace open (default: false)
- Persists last-selected persona per workspace
- Three commands:
  - **Select Persona** (`Ctrl+Alt+P` / `Cmd+Alt+P`) - QuickPick to select and copy
  - **Select Persona and Open Chat** - Select, copy, then open Copilot Chat
  - **Recopy Last Persona** - Re-copy last selected persona
- Uses `js-yaml` for parsing persona files
- Includes comprehensive inline documentation

**Clipboard Approach:**
Due to VS Code API limitations, we cannot directly inject text into Copilot Chat. The extension copies the persona system prompt to the clipboard, and users paste it into their chat session. This is documented in both the code and README.

### 4. GitHub Actions Workflow (`.github/workflows/package-vsix.yaml`)

Automated packaging workflow that:
- Triggers on push to `copilot/add-copilot-persona-support` branch and PRs
- Sets up Node.js 18
- Installs dependencies with `npm ci`
- Compiles the TypeScript extension
- Packages the extension using `vsce package`
- Uploads the `.vsix` as a workflow artifact (30-day retention)

**Artifact name:** `copilot-personas-vsix`

### 5. Documentation

**Extension README** (`vscode-extensions/copilot-personas/README.md`)
- Usage instructions
- Command descriptions
- Workspace settings documentation
- Installation from VSIX instructions
- Building and packaging guide
- CI/CD artifact download instructions
- How it works explanation
- Tips and troubleshooting

**Main README Update**
- Added "Copilot Personas" section
- Quick start guide for CLI and extension
- Links to detailed documentation

**CLI Documentation**
- Extensive header comments in `start-chat.js`
- Usage examples
- Environment variable documentation
- Provider switching instructions

## How to Use

### CLI Tool

1. **List available personas:**
   ```bash
   node scripts/start-chat.js --list
   ```

2. **Start a chat with a persona:**
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   node scripts/start-chat.js --persona software_engineer "Explain this code pattern"
   ```

3. **Interactive mode:**
   ```bash
   node scripts/start-chat.js --interactive
   ```

4. **Use environment variable for default persona:**
   ```bash
   export COPILOT_PERSONA=cloud_architect
   node scripts/start-chat.js "Design a scalable architecture"
   ```

### VS Code Extension

#### Installation

1. Go to [Actions](https://github.com/ryanj27/fedstack-ui/actions) tab
2. Click on the latest "Package VS Code Extension" workflow run
3. Scroll to "Artifacts" section
4. Download `copilot-personas-vsix`
5. Extract the `.vsix` file
6. In VS Code:
   - Open Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Click `...` menu → "Install from VSIX..."
   - Select the downloaded `.vsix` file

#### Usage

1. **Quick persona selection:**
   - Press `Ctrl+Alt+P` (or `Cmd+Alt+P` on Mac)
   - Choose a persona from the QuickPick
   - The persona prompt is copied to clipboard
   - Open GitHub Copilot Chat and paste the prompt

2. **Configure workspace defaults:**
   Add to `.vscode/settings.json`:
   ```json
   {
     "copilotPersonas.defaultPersona": "software_engineer",
     "copilotPersonas.autoCopyOnOpen": true
   }
   ```

3. **Commands (via Command Palette):**
   - `Copilot Personas: Select Persona`
   - `Copilot Personas: Select Persona and Open Chat`
   - `Copilot Personas: Recopy Last Persona`

#### Building from Source

```bash
cd vscode-extensions/copilot-personas
npm install
npm run compile
npm run package:vsix
```

The `.vsix` file will be created in the extension directory.

## Security Notes

- **Persona files contain no secrets** - They are plain text YAML with system prompts
- **API keys are never committed** - `OPENAI_API_KEY` must be set as environment variable
- **Extension uses clipboard only** - No external API calls from the extension
- **CLI requires explicit API key** - Clear error message if missing

## Testing

All components have been tested:

✅ Persona files load correctly  
✅ CLI script lists personas  
✅ CLI script parses YAML correctly  
✅ CLI script shows help and options  
✅ VS Code extension compiles without errors  
✅ VSIX packaging succeeds  
✅ GitHub Actions workflow configured correctly  

## Files Changed

```
.copilot/
├── config.yaml
└── personas/
    ├── cloud_architect.yaml
    ├── devops_engineer.yaml
    ├── software_architect.yaml
    └── software_engineer.yaml

scripts/
└── start-chat.js

vscode-extensions/copilot-personas/
├── .gitignore
├── .vscodeignore
├── README.md
├── package.json
├── tsconfig.json
└── src/
    └── extension.ts

.github/workflows/
└── package-vsix.yaml

README.md (updated)
```

## Next Steps

After merging this PR:

1. **Download the extension** from GitHub Actions artifacts
2. **Install it in VS Code** following the instructions above
3. **Configure workspace settings** if desired
4. **Start using personas** in your AI chats!

## Notes

- The extension uses a clipboard-based approach due to VS Code API limitations
- Users must manually paste the persona prompt into Copilot Chat
- The CLI requires Node.js 18+ and `OPENAI_API_KEY` for chat functionality
- To use a different LLM provider, edit the `sendChatMessage()` function in `start-chat.js`
