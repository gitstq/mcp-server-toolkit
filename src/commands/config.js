/**
 * config command - Generate client configuration for a server
 */
import chalk from 'chalk';
import { generateConfig, printConfig } from '../lib/config/configGenerator.js';

export async function configCommand(serverId, options) {
  console.log(chalk.bold.cyan('\n  MCP Server Config Generator'));
  console.log('  ' + '─'.repeat(60));

  try {
    const config = await generateConfig(serverId, options.client, options.output);
    printConfig(config, options.client);

    if (!options.output) {
      console.log(chalk.gray('\n  Use -o, --output <file> to save to a file'));
    }

    console.log(chalk.gray('\n  Copy this configuration to your MCP client config file.'));
    console.log(chalk.gray(`  Client: ${options.client}`));
  } catch (error) {
    console.error(chalk.red('  ✗ Error:'), error.message);
    process.exit(1);
  }
}