/**
 * init command - Initialize a new MCP server project
 */
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

const TEMPLATES = {
  minimal: {
    name: 'Minimal MCP Server',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'mcp-server-minimal',
          version: '1.0.0',
          type: 'module',
          description: 'A minimal MCP server',
          main: 'src/index.js',
          scripts: { start: 'node src/index.js', test: 'echo "No tests yet"' },
          dependencies: { '@modelcontextprotocol/sdk': '^1.0.0' },
        },
        null, 2
      ),
      'src/index.js': `import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'mcp-server-minimal', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'hello',
        description: 'Say hello',
        inputSchema: {
          type: 'object',
          properties: { name: { type: 'string', description: 'Your name' } },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'hello') {
    const name = request.params.arguments?.name || 'World';
    return { content: [{ type: 'text', text: \`Hello, \${name}!\` }] };
  }
  throw new Error('Unknown tool');
});

const transport = new StdioServerTransport();
await server.connect(transport);
`,
      'README.md': '# MCP Server Minimal\n\nA minimal MCP server template.\n',
      '.gitignore': 'node_modules/\ndist/\n*.log\n.env\n',
    },
  },
  full: {
    name: 'Full MCP Server with Tests',
    files: {},
  },
  agent: {
    name: 'Agent-Ready MCP Server',
    files: {},
  },
};

export async function initCommand(projectName, options) {
  const template = TEMPLATES[options.template] || TEMPLATES.minimal;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.bold.cyan(`\n  Initializing MCP Server: ${projectName}`));
  console.log(chalk.gray(`  Template: ${template.name}`));
  console.log('  ' + '─'.repeat(60));

  try {
    await fs.mkdir(projectPath, { recursive: true });
    await fs.mkdir(`${projectPath}/src`, { recursive: true });

    const files = template.files || TEMPLATES.minimal.files;

    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = `${projectPath}/${filePath}`;
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
      console.log(chalk.green(`  ✓ ${filePath}`));
    }

    // Add .gitignore if not present
    if (!files['.gitignore']) {
      await fs.writeFile(`${projectPath}/.gitignore`, 'node_modules/\ndist/\n*.log\n.env\n', 'utf-8');
    }

    console.log(chalk.green(`\n  ✓ Project created at: ${projectPath}`));
    console.log(chalk.gray(`\n  Next steps:`));
    console.log(chalk.gray(`    cd ${projectName}`));
    console.log(chalk.gray(`    npm install`));
    console.log(chalk.gray(`    npm start`));
  } catch (error) {
    console.error(chalk.red('  ✗ Init failed:'), error.message);
    process.exit(1);
  }
}