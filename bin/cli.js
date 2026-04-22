#!/usr/bin/env node
/**
 * MCP Server Toolkit - CLI Entry Point
 * Provides discovery, testing, and deployment tools for MCP servers
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { discoverCommand } from '../src/commands/discover.js';
import { testCommand } from '../src/commands/test.js';
import { configCommand } from '../src/commands/config.js';
import { deployCommand } from '../src/commands/deploy.js';
import { listCommand } from '../src/commands/list.js';
import { infoCommand } from '../src/commands/info.js';
import { initCommand } from '../src/commands/init.js';

const program = new Command();

program
  .name('mcp-toolkit')
  .description(chalk.cyan('MCP Server Toolkit - Discover, test, and deploy MCP servers'))
  .version('1.0.0')
  .hook('preAction', (thisCommand) => {
    // Suppress default display for cleaner output
  });

// Main commands
program
  .command('discover')
  .description('Discover MCP servers from various sources')
  .option('-s, --source <source>', 'Specific source to query (official|sotahub|custom)', 'all')
  .option('-k, --keyword <keyword>', 'Filter servers by keyword')
  .option('-o, --output <file>', 'Save results to JSON file')
  .option('--json', 'Output as raw JSON')
  .action(discoverCommand);

program
  .command('test')
  .description('Test an MCP server for schema compatibility and health')
  .argument('<server>', 'Server URL or identifier')
  .option('-t, --timeout <ms>', 'Request timeout in milliseconds', '10000')
  .option('-v, --verbose', 'Verbose output')
  .option('--schema', 'Validate JSON-RPC schema only')
  .action(testCommand);

program
  .command('config')
  .description('Generate client configuration for a server')
  .argument('<server-id>', 'Server identifier from discover')
  .option('-c, --client <client>', 'Target client (claude|openai|anything|custom)', 'claude')
  .option('-o, --output <file>', 'Output file path')
  .action(configCommand);

program
  .command('deploy')
  .description('Deploy a local MCP server to a hosting platform')
  .argument('<server-path>', 'Path to local MCP server directory')
  .option('-p, --platform <platform>', 'Platform (local|docker|vercel|fly)', 'local')
  .option('-n, --name <name>', 'Deployment name')
  .option('--port <port>', 'Port number', '8080')
  .action(deployCommand);

program
  .command('list')
  .description('List all cached/discovered servers')
  .option('--source <source>', 'Filter by source')
  .option('--json', 'Output as JSON')
  .action(listCommand);

program
  .command('info')
  .description('Show detailed info about a server')
  .argument('<server-id>', 'Server identifier')
  .option('--json', 'Output as JSON')
  .action(infoCommand);

program
  .command('init')
  .description('Initialize a new MCP server project with boilerplate')
  .argument('[project-name]', 'Project name', 'my-mcp-server')
  .option('-t, --template <template>', 'Project template (minimal|full|agent)', 'minimal')
  .action(initCommand);

// Global options
program
  .option('-v, --verbose', 'Enable verbose logging')
  .option('--no-color', 'Disable color output')
  .configureOutput({
    writeErr: (str) => console.error(chalk.red('[ERROR]'), str),
  });

// Handle unknown commands
program.on('command:unknown', () => {
  console.error(chalk.red('Unknown command. Run `mcp-toolkit --help` for usage.'));
  process.exit(1);
});

program.parse();