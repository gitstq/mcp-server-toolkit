/**
 * list command - List all cached/discovered servers
 */
import chalk from 'chalk';
import { getAllServers } from '../lib/sources/registry.js';

export async function listCommand(options) {
  console.log(chalk.bold.cyan('\n  MCP Server List'));

  let servers = getAllServers();

  if (options.source) {
    const { getServersBySource } = await import('../lib/sources/registry.js');
    servers = getServersBySource(options.source);
  }

  if (options.json) {
    console.log(JSON.stringify(servers, null, 2));
    return;
  }

  console.log('  ' + '─'.repeat(60));
  console.log(chalk.green(`\n  Total: ${servers.length} server(s)\n`));

  for (const server of servers) {
    console.log(
      `  ${chalk.cyan('[' + server.category + ']')} ${chalk.bold(server.name)} ${chalk.gray('— ' + server.id)}`
    );
    console.log(`    ${server.description}`);
    console.log();
  }
}