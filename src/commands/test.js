/**
 * test command - Test an MCP server for schema compatibility and health
 */
import chalk from 'chalk';
import { testServer, printTestResults } from '../lib/test/tester.js';

export async function testCommand(serverUrl, options) {
  console.log(chalk.bold.cyan('\n  MCP Server Test'));
  console.log('  ' + '─'.repeat(60));

  const results = await testServer(serverUrl, {
    timeout: parseInt(options.timeout),
    verbose: options.verbose,
    schemaOnly: options.schema,
  });

  printTestResults(results, options.verbose);

  // Exit with error if not reachable
  if (!results.health?.reachable) {
    process.exit(1);
  }
}