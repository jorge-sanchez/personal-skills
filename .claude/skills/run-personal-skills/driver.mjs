#!/usr/bin/env node
/**
 * Driver for personal-skills documentation site
 * Provides programmatic access to view and interact with skill documentation
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const SHOTS_DIR = '/tmp/shots';
const PORT = 3000;

// Ensure shots directory exists
if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

/**
 * Start the dev server in background
 */
function startServer() {
  console.log(`Starting dev server on port ${PORT}...`);
  
  // Kill any existing server on this port
  try {
    execSync(`pkill -f "serve" || true`, { stdio: 'pipe' });
  } catch (e) {
    // Ignore
  }

  const server = spawn('npx', ['serve', '.', '-l', PORT.toString()], {
    stdio: ['pipe', 'pipe', 'pipe'],
    detached: true
  });

  // Wait for server to be ready
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Server failed to start in time'));
    }, 10000);

    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    server.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      if (output.includes(`http://localhost:${PORT}`)) {
        clearTimeout(timeout);
        resolve(server);
      }
    });

    server.stdout.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Take a screenshot of the documentation home page
 */
async function screenshotHome() {
  const url = `http://localhost:${PORT}`;
  const outfile = path.join(SHOTS_DIR, 'personal-skills-home.png');
  
  console.log(`Taking screenshot of ${url}...`);
  
  try {
    const result = execSync(
      `chromium-cli "${url}" 'goto /' 'ss "${outfile}"'`,
      { stdio: 'pipe' }
    );
    console.log(`Screenshot saved to ${outfile}`);
    return outfile;
  } catch (e) {
    console.error(`Failed to take screenshot: ${e.message}`);
    return null;
  }
}

/**
 * Take a screenshot of the development skills
 */
async function screenshotDevelopment() {
  const url = `http://localhost:${PORT}/development/`;
  const outfile = path.join(SHOTS_DIR, 'personal-skills-development.png');
  
  console.log(`Taking screenshot of ${url}...`);
  
  try {
    const result = execSync(
      `chromium-cli "${url}" 'goto development/' 'ss "${outfile}"'`,
      { stdio: 'pipe' }
    );
    console.log(`Screenshot saved to ${outfile}`);
    return outfile;
  } catch (e) {
    console.error(`Failed to take screenshot: ${e.message}`);
    return null;
  }
}

/**
 * List all skills in the repository
 */
function listSkills() {
  console.log('Available skills:');

  // Check development directory for skills
  const devDir = path.join(process.cwd(), 'development');

  if (fs.existsSync(devDir)) {
    // First check for SKILL.md directly in development/
    const directSkill = path.join(devDir, 'SKILL.md');
    if (fs.existsSync(directSkill)) {
      const content = fs.readFileSync(directSkill, 'utf8');
      const nameMatch = content.match(/^name:\s*(.+)$/m);
      const descMatch = content.match(/^description:\s*(.+)$/m);
      const name = nameMatch ? nameMatch[1] : 'developer-flow';
      const desc = descMatch ? descMatch[1] : 'No description';
      console.log(`  - ${name}: ${desc}`);
    }

    // Then check subdirectories
    const skillDirs = fs.readdirSync(devDir).filter(d => {
      const skillPath = path.join(devDir, d, 'SKILL.md');
      return fs.existsSync(skillPath) && d !== 'SKILL.md';
    });

    skillDirs.forEach(dir => {
      const skillPath = path.join(devDir, dir, 'SKILL.md');
      const content = fs.readFileSync(skillPath, 'utf8');
      const nameMatch = content.match(/^name:\s*(.+)$/m);
      const descMatch = content.match(/^description:\s*(.+)$/m);
      const name = nameMatch ? nameMatch[1] : dir;
      const desc = descMatch ? descMatch[1] : 'No description';
      console.log(`  - ${name}: ${desc}`);
    });
  }
}

/**
 * Main entry point - parse commands from args
 */
async function main() {
  const command = process.argv[2] || 'help';
  
  switch (command) {
    case 'launch':
    case 'start':
      await startServer();
      console.log('Server started. Press Ctrl-C to stop.');
      break;
      
    case 'screenshot':
    case 'ss':
      await startServer();
      await screenshotHome();
      break;
      
    case 'ss-dev':
      await startServer();
      await screenshotDevelopment();
      break;
      
    case 'list':
      listSkills();
      break;
      
    case 'help':
    default:
      console.log(`Usage: node driver.mjs <command>

Commands:
  launch/start   - Start the dev server
  screenshot/ss  - Take screenshot of home page
  ss-dev         - Take screenshot of development skills
  list           - List all skills
  help           - Show this help
`);
  }
}

main().catch(console.error);
