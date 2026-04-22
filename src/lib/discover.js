/**
 * MCP Server Discovery Engine
 * Core discovery logic for finding MCP servers from multiple sources
 */

import chalk from 'chalk';
import ora from 'ora';
import { getAllServers, getServersBySource, SOURCE_REGISTRY } from './sources/registry.js';
import { filterServers } from './filter.js';

export async function discoverServers(options = {}) {
  const { source = 'all', keyword = null, verbose = false } = options;

  const spinner = ora({
    text: 'Discovering MCP servers...',
    color: 'cyan',
  }).start();

  try {
    // Get servers from configured source
    let servers = source === 'all' ? getAllServers() : getServersBySource(source);

    if (servers.length === 0) {
      spinner.warn('No servers found from source: ' + source);
      return [];
    }

    spinner.succeed(`Found ${servers.length} MCP server(s) from ${source}`);

    // Apply keyword filter if provided
    if (keyword) {
      servers = filterServers(servers, keyword);
      console.log(chalk.gray(`  Filtered by keyword "${keyword}": ${servers.length} matches`));
    }

    return servers;
  } catch (error) {
    spinner.fail('Discovery failed: ' + error.message);
    if (verbose) console.error(error.stack);
    return [];
  }
}

export function printServerList(servers, options = {}) {
  const { verbose = false, showSource = true } = options;

  if (servers.length === 0) {
    console.log(chalk.yellow('  No servers found.'));
    return;
  }

  console.log(chalk.bold('\n  MCP Servers:'));
  console.log('  ' + '─'.repeat(70));

  for (const server of servers) {
    const icon = getCategoryIcon(server.category);
    console.log(
      `  ${chalk.cyan(icon)} ${chalk.bold(server.name)} ${chalk.gray('(' + server.id + ')')}`
    );
    console.log(`     ${server.description}`);
    console.log(
      `     ${chalk.gray('Tags:')} ${server.tags.map((t) => chalk.gray(t)).join(', ')}`
    );
    if (showSource) {
      console.log(`     ${chalk.gray('Source:')} ${server.provider} | ${chalk.gray('Transports:')} ${server.transports.join(', ')}`);
    }
    console.log();
  }
}

export function printServerSummary(servers) {
  const byProvider = {};
  for (const server of servers) {
    byProvider[server.provider] = (byProvider[server.provider] || 0) + 1;
  }
  console.log(chalk.bold('\n  Summary:'));
  for (const [provider, count] of Object.entries(byProvider)) {
    console.log(`    ${chalk.gray(provider + ':')} ${chalk.green(count)} server(s)`);
  }
}

function getCategoryIcon(category) {
  const icons = {
    ai: '🤖',
    database: '🗄️',
    utility: '🔧',
    integration: '🔗',
    search: '🔍',
    communication: '💬',
    productivity: '📋',
    monitoring: '📊',
    commerce: '💰',
    default: '📦',
  };
  return icons[category] || icons.default;
}