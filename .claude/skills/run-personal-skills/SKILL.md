---
name: run-personal-skills
description: Build, run, and drive personal-skills documentation. Use when asked to start the docs server, view skills in a browser, or take screenshots of skill documentation.
---

Drive this documentation site via `.claude/skills/run-personal-skills/driver.mjs` under a dev server, or directly via `chromium-cli` against the served pages. The site displays skill documentation from the `development/` directory.

All paths below are relative to the repo root.

## Prerequisites

```bash
# Node.js for npm and driver script
sudo apt-get update
sudo apt-get install -y nodejs npm

# Chromium for headless browser
sudo apt-get install -y chromium

# Install driver dependencies
npm install -g chromium-cli
```

## Setup

No setup required - this is a static documentation site.

## Build

No build step - this is a static markdown site.

## Run (agent path)

Use the driver script to launch the server and interact with the docs:

```bash
# Launch server and take screenshot of home page
node .claude/skills/run-personal-skills/driver.mjs screenshot

# Launch server and take screenshot of development skills
node .claude/skills/run-personal-skills/driver.mjs ss-dev

# List all available skills
node .claude/skills/run-personal-skills/driver.mjs list
```

Or use `chromium-cli` directly:

```bash
# Start dev server
npx serve . -l 3000 &

# Drive with chromium-cli
chromium-cli http://localhost:3000 'goto /' 'ss /tmp/shots/personal-skills.png'
```

Where artifacts land:
- Screenshots -> `/tmp/shots/`
- Server logs -> `/tmp/serve.log`

| command | what it does |
|---|---|
| `driver.mjs screenshot` | Start server and screenshot home page |
| `driver.mjs ss-dev` | Start server and screenshot development skills |
| `driver.mjs list` | List all skills in the repo |
| `driver.mjs launch` | Start server (keeps running) |
| `chromium-cli <url> 'goto <path>' 'ss <file>'` | Direct browser interaction |

## Run (human path)

```bash
npx serve . -l 3000   # -> Opens docs in browser. Ctrl-C to stop.
```

## Test

```bash
# Validate markdown files have frontmatter
find . -name "SKILL.md" -exec grep -l "^---" {} \; | wc -l
```

Expected: All skill files have valid YAML frontmatter.

---

## Gotchas

- **chromium-cli not found**: Install globally with `npm install -g chromium-cli`
- **Port already in use**: Kill existing servers with `pkill -f "serve"` or use a different port
- **Screenshots fail**: Ensure Chromium is installed and has necessary libraries (may need `libnss3`, `libxss1`, `libasound2`)

## Troubleshooting

- **"Command not found: chromium-cli"**: Install with `npm install -g chromium-cli`
- **"Cannot find module" when running driver**: Ensure Node.js and npm are installed
- **Server starts but crashes**: Check port with `lsof -i :3000` and kill conflicting processes
- **Screenshot shows blank page**: Add a delay before screenshot - `chromium-cli <url> 'wait 2000' 'ss <file>'`
