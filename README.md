# MCP Server Toolkit

> Discover, test, and deploy MCP servers with ease.

**MCP Server Toolkit** is a unified command-line toolkit for AI developers working with the Model Context Protocol. It provides server discovery, schema testing, configuration generation, and deployment tools — all from one CLI.

## ✨ Features

- 🔍 **Server Discovery** — Discover MCP servers from official registry and popular sources
- 🧪 **Schema Testing** — Validate JSON-RPC 2.0 schema compliance and transport health
- ⚙️ **Config Generator** — Generate client configs for Claude, OpenAI, and custom MCP clients
- 🚀 **Deployment** — Deploy local servers to local, Docker, Vercel, or Fly.io
- 📦 **Project Init** — Bootstrap new MCP server projects from templates
- 🗂️ **Server Registry** — Built-in registry of 20+ official and popular MCP servers

## 📦 Installation

```bash
npm install -g mcp-server-toolkit
```

Or run directly with npx:

```bash
npx mcp-toolkit discover
```

## 🚀 Quick Start

```bash
# Discover available MCP servers
mcp-toolkit discover

# Test a server for schema compliance
mcp-toolkit test mcp/github

# Generate Claude Desktop config for a server
mcp-toolkit config mcp/filesystem --client claude -o claude_desktop_config.json

# List all known servers
mcp-toolkit list

# Get detailed info about a server
mcp-toolkit info mcp/github

# Initialize a new MCP server project
mcp-toolkit init my-server --template minimal

# Deploy a local server
mcp-toolkit deploy ./my-server --platform docker
```

## 📋 Commands

| Command | Description |
|---------|-------------|
| `discover` | Discover MCP servers from official, popular, or custom sources |
| `test <server>` | Test server schema compliance and transport health |
| `config <server-id>` | Generate client configuration files |
| `list` | List all cached or discovered servers |
| `info <server-id>` | Show detailed information about a server |
| `init [name]` | Initialize a new MCP server project |
| `deploy <path>` | Deploy a local MCP server |

## 🔧 Configuration

### Discover Options

```bash
mcp-toolkit discover --source official        # Official MCP servers only
mcp-toolkit discover --source popular         # Popular third-party servers
mcp-toolkit discover --keyword github         # Filter by keyword
mcp-toolkit discover --output servers.json    # Save results to file
```

### Test Options

```bash
mcp-toolkit test mcp/github --timeout 5000     # Custom timeout
mcp-toolkit test mcp/github --verbose         # Verbose output
mcp-toolkit test mcp/github --schema          # Schema validation only
```

### Config Options

```bash
mcp-toolkit config mcp/github --client claude     # Claude Desktop config
mcp-toolkit config mcp/github --client openai     # OpenAI config
mcp-toolkit config mcp/github --client anything   # Generic MCP client
mcp-toolkit config mcp/github -o config.json      # Save to file
```

## 🌐 Supported Sources

| Source | Description | Server Count |
|--------|-------------|-------------|
| `official` | MCP Official Servers (Anthropic) | 10 |
| `popular` | Popular third-party integrations | 8 |
| `all` | All sources combined | 18 |

## 🏗️ Architecture

```
mcp-server-toolkit/
├── bin/cli.js              # CLI entry point
├── src/
│   ├── commands/            # Command implementations
│   │   ├── discover.js
│   │   ├── test.js
│   │   ├── config.js
│   │   ├── deploy.js
│   │   ├── list.js
│   │   ├── info.js
│   │   └── init.js
│   └── lib/
│       ├── sources/         # Server registry
│       │   └── registry.js
│       ├── test/            # Testing framework
│       │   └── tester.js
│       ├── config/          # Config generation
│       │   └── configGenerator.js
│       ├── discover.js      # Discovery engine
│       ├── filter.js        # Filtering utilities
│       └── deploy.js        # Deployment utilities
├── tests/
└── configs/
```

## 🔌 MCP Server Registry

### Official Servers

| ID | Name | Category |
|----|------|---------|
| `mcp/filesystem` | Filesystem | utility |
| `mcp/github` | GitHub | integration |
| `mcp/brave-search` | Brave Search | search |
| `mcp/sentry` | Sentry | monitoring |
| `mcp/slack` | Slack | communication |
| `mcp/sqlite` | SQLite | database |
| `mcp/postgres` | PostgreSQL | database |
| `mcp/aws-kb-retrieval` | AWS KB Retrieval | ai |
| `mcp/google-maps` | Google Maps | utility |
| `mcp/everart` | Everart | ai |

### Popular Third-Party

| ID | Provider | Category |
|----|----------|---------|
| `anthropic/claude-code` | Anthropic | ai |
| `alibaba/dashscope` | Alibaba | ai |
| `baidu/qianfan` | Baidu | ai |
| `tencent/cloud` | Tencent | ai |
| `notion/notion-api` | Notion | productivity |
| `linear/linear-api` | Linear | productivity |
| `stripe/stripe-api` | Stripe | commerce |
| `datadog/datadog-api` | Datadog | monitoring |

## 📚 Development

```bash
# Clone the repository
git clone https://github.com/gitstq/mcp-server-toolkit
cd mcp-server-toolkit

# Install dependencies
npm install

# Run tests
npm test

# Run locally
npm start

# Link for local development
npm link
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Projects

- [mcp-flow](https://github.com/gitstq/mcp-flow) — MCP流量编排引擎
- [agent-adapter](https://github.com/gitstq/agent-adapter) — 通用Agent适配层
- [awesome-ai-agent-skills](https://github.com/gitstq/awesome-ai-agent-skills) — AI Agent技能合集