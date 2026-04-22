/**
 * MCP Client Configuration Generator
 * Generates configuration files for various AI clients
 */

import chalk from 'chalk';
import { getServerById, getAllServers } from '../sources/registry.js';

export async function generateConfig(serverId, clientType = 'claude', outputFile = null) {
  const server = getServerById(serverId);

  if (!server) {
    // Try to find by partial match
    const allServers = getAllServers();
    const matches = allServers.filter(
      (s) => s.id.includes(serverId) || s.name.toLowerCase().includes(serverId.toLowerCase())
    );
    if (matches.length > 0) {
      console.log(
        chalk.yellow(`  Did you mean: ${matches.map((m) => m.id).join(', ')}?`)
      );
    }
    throw new Error(`Server not found: ${serverId}. Run 'mcp-toolkit discover' to see available servers.`);
  }

  const configGenerators = {
    claude: generateClaudeConfig,
    openai: generateOpenAIConfig,
    anything: generateAnythingConfig,
    custom: generateCustomConfig,
  };

  const generator = configGenerators[clientType] || configGenerators.custom;
  const config = await generator(server);

  const content = JSON.stringify(config, null, 2);

  if (outputFile) {
    const fs = await import('fs/promises');
    await fs.writeFile(outputFile, content, 'utf-8');
    console.log(chalk.green(`  ✓ Configuration saved to: ${outputFile}`));
  }

  return config;
}

function generateClaudeConfig(server) {
  return {
    mcpServers: {
      [server.name.replace(/\s+/g, '-').toLowerCase()]: {
        command: 'npx',
        args: ['-y', `@modelcontextprotocol/server-${server.id.split('/')[1] || server.id}`],
        env: {
          // Add required environment variables
        },
      },
    },
    metadata: {
      serverId: server.id,
      provider: server.provider,
      transport: server.transports[0],
      generatedBy: 'mcp-server-toolkit',
      generatedAt: new Date().toISOString(),
    },
  };
}

function generateOpenAIConfig(server) {
  return {
    servers: [
      {
        id: server.id,
        name: server.name,
        description: server.description,
        endpoint: `https://api.example.com/mcp/${server.id}`,
        auth: {
          type: 'bearer',
          tokenEnvVar: `${server.id.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_API_KEY`,
        },
        transport: server.transports[0],
      },
    ],
    metadata: {
      provider: server.provider,
      generatedBy: 'mcp-server-toolkit',
      generatedAt: new Date().toISOString(),
    },
  };
}

function generateAnythingConfig(server) {
  // Generic format compatible with any MCP client
  return {
    servers: {
      [server.id]: {
        name: server.name,
        description: server.description,
        provider: server.provider,
        transports: server.transports,
        schemaVersion: server.schemaVersion,
        tags: server.tags,
        install: {
          command: 'npx',
          args: ['-y', `mcp-server-${server.id.replace('/', '-')}`],
        },
      },
    },
    metadata: {
      generatedBy: 'mcp-server-toolkit',
      generatedAt: new Date().toISOString(),
    },
  };
}

function generateCustomConfig(server) {
  return {
    mcp: {
      server: {
        id: server.id,
        name: server.name,
        category: server.category,
        description: server.description,
        provider: server.provider,
        url: server.url,
        transports: server.transports,
        schemaVersion: server.schemaVersion,
        tags: server.tags,
      },
    },
    install: {
      command: 'npx',
      args: ['-y', `@modelcontextprotocol/server-${server.id.split('/')[1] || server.id}`],
    },
    metadata: {
      generatedBy: 'mcp-server-toolkit',
      generatedAt: new Date().toISOString(),
    },
  };
}

export function printConfig(config, clientType) {
  console.log(chalk.bold(`\n  Configuration (${clientType}):`));
  console.log('  ' + '─'.repeat(60));
  console.log(chalk.gray(JSON.stringify(config, null, 2).split('\n').map((l) => '  ' + l).join('\n')));
}