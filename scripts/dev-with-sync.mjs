import { spawn } from 'child_process';

console.log('🚀 Starting Portfolio Development Server with Live Sanity ➔ Supabase Sync...\n');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// 1. Spawn Vite dev server
const viteProcess = spawn(npmCmd, ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

// 2. Spawn Sanity -> Supabase Sync Daemon
const syncProcess = spawn(npmCmd, ['run', 'sync:watch'], {
  stdio: 'inherit',
  shell: true,
});

function cleanup() {
  console.log('\n🛑 Shutting down dev server and sync daemon...');
  viteProcess.kill();
  syncProcess.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
