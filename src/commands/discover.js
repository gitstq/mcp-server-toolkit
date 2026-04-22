/**
 * discover command - Discover MCP servers from various sources
 */
import chalk from 'chalk';
import { discoverServers, printServerList, printServerSummary } from '../lib/discover.js';
import { filterByTransport, sortByName } from '../lib/filter.js';
import fs from 'fs/promises';

export async function discoverCommand(options) {
  const servers = await discoverServers({
    source: options.source,
    keyword: options.keyword,
    verbose: options.verbose,
  });

  if (servers.length === 0) {
    console.log(chalk.yellow('  No servers found. Try with --source official or --source popular'));
    return;
  }

  // Apply transport filter if specified
  let results = servers;
  if (options.transport) {
    results = filterByTransport(results, options.transport);
  }

  // Sort alphabetically
  results = sortByName(results);

  // Output
  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    printServerList(results, { verbose: options.verbose });
    printServerSummary(results);
  }

  // Save to file if requested
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(results, null, 2), 'utf-8');
    console.log(chalk.green(`\n  ✓ Results saved to: ${options.output}`));
  }

  console.log(chalk.gray(`\n  Run 'mcp-toolkit test <server-id>' to test a server`));
  console.log(chalk.gray(`  Run 'mcp-toolkit config <server-id>' to generate config`));
}