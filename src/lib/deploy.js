/**
 * MCP Server Deployment Utilities
 * Handles local and cloud deployment of MCP servers
 */

import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function deployServer(serverPath, options = {}) {
  const { platform = 'local', name = null, port = '8080', verbose = false } = options;

  const absolutePath = serverPath.startsWith('/')
    ? serverPath
    : `${process.cwd()}/${serverPath}`;

  // Validate server directory
  try {
    await fs.access(absolutePath);
  } catch {
    throw new Error(`Server path not found: ${absolutePath}`);
  }

  // Check for package.json
  try {
    await fs.access(`${absolutePath}/package.json`);
  } catch {
    throw new Error('Server directory must contain a package.json');
  }

  const deployers = {
    local: deployLocal,
    docker: deployDocker,
    vercel: deployVercel,
    fly: deployFly,
  };

  const deployer = deployers[platform];
  if (!deployer) {
    throw new Error(`Unsupported platform: ${platform}. Supported: ${Object.keys(deployers).join(', ')}`);
  }

  return deployer(absolutePath, { name, port, verbose });
}

async function deployLocal(serverPath, options) {
  console.log(chalk.cyan('  Deploying MCP server locally...'));

  try {
    // Install dependencies
    console.log(chalk.gray('  Installing dependencies...'));
    await execAsync('npm install', { cwd: serverPath });

    console.log(chalk.green(`  ✓ Server deployed locally at port ${options.port}`));
    console.log(chalk.gray(`  Run: cd ${serverPath} && npm start`));
    console.log(chalk.gray(`  Or: npx mcp-server start --port ${options.port}`));

    return {
      platform: 'local',
      url: `http://localhost:${options.port}`,
      status: 'deployed',
    };
  } catch (error) {
    throw new Error('Local deployment failed: ' + error.message);
  }
}

async function deployDocker(serverPath, options) {
  console.log(chalk.cyan('  Building Docker image...'));

  try {
    // Check if Dockerfile exists
    try {
      await fs.access(`${serverPath}/Dockerfile`);
    } catch {
      // Generate Dockerfile
      const dockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${options.port}
CMD ["npm", "start"]
`;
      await fs.writeFile(`${serverPath}/Dockerfile`, dockerfile);
      console.log(chalk.gray('  Generated Dockerfile'));
    }

    const imageName = options.name || `mcp-server-${Date.now()}`;
    await execAsync(`docker build -t ${imageName} .`, { cwd: serverPath });

    console.log(chalk.green(`  ✓ Docker image built: ${imageName}`));
    console.log(chalk.gray(`  Run: docker run -p ${options.port}:${options.port} ${imageName}`));

    return {
      platform: 'docker',
      image: imageName,
      status: 'built',
    };
  } catch (error) {
    throw new Error('Docker deployment failed: ' + error.message);
  }
}

async function deployVercel(serverPath, options) {
  console.log(chalk.cyan('  Deploying to Vercel...'));
  try {
    console.log(chalk.yellow('  ⚠ Vercel deployment requires vercel CLI. Install with: npm i -g vercel'));
    console.log(chalk.gray('  Manual steps: cd ' + serverPath + ' && vercel'));
    return { platform: 'vercel', status: 'pending', instructions: 'Run vercel CLI manually' };
  } catch (error) {
    throw new Error('Vercel deployment failed: ' + error.message);
  }
}

async function deployFly(serverPath, options) {
  console.log(chalk.cyan('  Deploying to Fly.io...'));
  try {
    console.log(chalk.yellow('  ⚠ Fly.io deployment requires flyctl CLI. Install with: npm i -g flyctl'));
    console.log(chalk.gray('  Manual steps: cd ' + serverPath + ' && fly launch'));
    return { platform: 'fly', status: 'pending', instructions: 'Run flyctl CLI manually' };
  } catch (error) {
    throw new Error('Fly deployment failed: ' + error.message);
  }
}

export function printDeploymentResult(result) {
  console.log(chalk.bold('\n  Deployment Result:'));
  console.log('  ' + '─'.repeat(60));
  console.log(`  ${chalk.cyan('Platform:')} ${result.platform}`);
  console.log(`  ${chalk.cyan('Status:')} ${result.status}`);

  if (result.url) console.log(`  ${chalk.cyan('URL:')} ${result.url}`);
  if (result.image) console.log(`  ${chalk.cyan('Image:')} ${result.image}`);
}