/**
 * info command - Show detailed info about a server
 */
import chalk from 'chalk';
import { getServerById } from '../lib/sources/registry.js';

export async function infoCommand(serverId, options) {
  const server = getServerById(serverId);

  if (!server) {
    console.error(chalk.red(`  ✗ Server not found: ${serverId}`));
    process.exit(1);
  }

  const info = {
    id: server.id,
    name: server.name,
    description: server.description,
    category: server.category,
    provider: server.provider,
    schemaVersion: server.schemaVersion,
    transports: server.transports,
    tags: server.tags,
    url: server.url,
  };

  if (options.json) {
    console.log(JSON.stringify(info, null, 2));
    return;
  }

  console.log(chalk.bold.cyan(`\n  ${server.name}`));
  console.log('  ' + '─'.repeat(60));
  console.log(`  ${chalk.gray('ID:')} ${server.id}`);
  console.log(`  ${chalk.gray('Description:')} ${server.description}`);
  console.log(`  ${chalk.gray('Category:')} ${server.category}`);
  console.log(`  ${chalk.gray('Provider:')} ${server.provider}`);
  console.log(`  ${chalk.gray('Schema Version:')} ${server.schemaVersion}`);
  console.log(`  ${chalk.gray('Transports:')} ${server.transports.join(', ')}`);
  console.log(`  ${chalk.gray('Tags:')} ${server.tags.join(', ')}`);
  console.log(`  ${chalk.gray('URL:')} ${chalk.underline(server.url)}`);
  console.log();
  console.log(chalk.gray('  Next steps:'));
  console.log(chalk.gray(`    mcp-toolkit test ${server.id}`));
  console.log(chalk.gray(`    mcp-toolkit config ${server.id}`));
}