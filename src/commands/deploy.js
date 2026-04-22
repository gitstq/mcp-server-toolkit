/**
 * deploy command - Deploy a local MCP server
 */
import chalk from 'chalk';
import { deployServer, printDeploymentResult } from '../lib/deploy.js';

export async function deployCommand(serverPath, options) {
  console.log(chalk.bold.cyan('\n  MCP Server Deployment'));
  console.log('  ' + '─'.repeat(60));

  try {
    const result = await deployServer(serverPath, {
      platform: options.platform,
      name: options.name,
      port: options.port,
      verbose: options.verbose,
    });
    printDeploymentResult(result);
  } catch (error) {
    console.error(chalk.red('  ✗ Deployment failed:'), error.message);
    process.exit(1);
  }
}