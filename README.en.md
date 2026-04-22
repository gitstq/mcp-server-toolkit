# MCP Server Toolkit

<p align="center">
  <img src="https://img.shields.io/npm/v/mcp-server-toolkit?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/MCP-Protocol-orange?style=flat-square" alt="MCP Protocol">
</p>

> 🚀 One-stop MCP server discovery, testing, and deployment toolkit

**MCP Server Toolkit** is a comprehensive command-line toolkit designed for AI developers working with the Model Context Protocol (MCP). It provides server discovery, schema testing, configuration generation, and deployment tools to help you easily manage the MCP ecosystem.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Server Discovery** | Discover MCP servers from official registry and popular sources |
| 🧪 **Schema Testing** | Validate JSON-RPC 2.0 protocol compliance and transport health |
| ⚙️ **Config Generator** | Generate configurations for Claude, OpenAI, and custom MCP clients |
| 🚀 **One-Click Deploy** | Deploy to local, Docker, Vercel, or Fly.io platforms |
| 📦 **Project Init** | Bootstrap new MCP server projects from templates |
| 🗂️ **Server Registry** | Built-in registry of 18+ official and popular MCP servers |

---

## 📦 Quick Start

### Global Installation

```bash
npm install -g mcp-server-toolkit
```

### Run Without Installation

```bash
npx mcp-toolkit discover
```

### Verify Installation

```bash
mcp-toolkit --version
# Output: 1.0.0
```

---

## 🚀 Usage Guide

### 1. Discover MCP Servers

```bash
# Discover all available servers
mcp-toolkit discover

# View official servers only
mcp-toolkit discover --source official

# Search by keyword
mcp-toolkit discover --keyword database

# Save results to file
mcp-toolkit discover --output servers.json
```

### 2. View Server Details

```bash
# List all known servers
mcp-toolkit list

# View specific server details
mcp-toolkit info mcp/github
```

### 3. Test Servers

```bash
# Test server schema compliance
mcp-toolkit test mcp/github

# Custom timeout
mcp-toolkit test mcp/github --timeout 5000

# Verbose output mode
mcp-toolkit test mcp/github --verbose
```

### 4. Generate Client Configurations

```bash
# Generate Claude Desktop config
mcp-toolkit config mcp/filesystem --client claude -o claude_desktop_config.json

# Generate OpenAI config
mcp-toolkit config mcp/github --client openai -o openai_config.json

# Generate generic MCP client config
mcp-toolkit config mcp/github --client anything -o mcp_config.json
```

### 5. Initialize New Projects

```bash
# Create project with minimal template
mcp-toolkit init my-server --template minimal

# Use full template
mcp-toolkit init my-server --template full
```

### 6. Deploy Servers

```bash
# Docker deployment
mcp-toolkit deploy ./my-server --platform docker

# Vercel deployment
mcp-toolkit deploy ./my-server --platform vercel

# Fly.io deployment
mcp-toolkit deploy ./my-server --platform flyio
```

---

## 🌐 Supported Sources

| Source | Description | Server Count |
|--------|-------------|--------------|
| `official` | MCP Official Servers (Anthropic) | 10 |
| `popular` | Popular third-party integrations | 8 |
| `all` | All sources combined | 18 |

---

## 🗂️ Server Registry

### Official Servers

| ID | Name | Category | Description |
|----|------|----------|-------------|
| `mcp/filesystem` | Filesystem | Utility | File system operations |
| `mcp/github` | GitHub | Integration | GitHub API integration |
| `mcp/brave-search` | Brave Search | Search | Brave search engine |
| `mcp/sentry` | Sentry | Monitoring | Error monitoring |
| `mcp/slack` | Slack | Communication | Slack messaging |
| `mcp/sqlite` | SQLite | Database | SQLite database |
| `mcp/postgres` | PostgreSQL | Database | PostgreSQL database |
| `mcp/aws-kb-retrieval` | AWS KB | AI | AWS knowledge base retrieval |
| `mcp/google-maps` | Google Maps | Utility | Map services |
| `mcp/everart` | Everart | AI | AI image generation |

### Popular Third-Party

| ID | Provider | Category | Description |
|----|----------|----------|-------------|
| `anthropic/claude-code` | Anthropic | AI | Claude Code |
| `alibaba/dashscope` | Alibaba | AI | Tongyi Qianwen |
| `baidu/qianfan` | Baidu | AI | Wenxin Yiyan |
| `tencent/cloud` | Tencent | AI | Tencent Cloud AI |
| `notion/notion-api` | Notion | Productivity | Notion API |
| `linear/linear-api` | Linear | Productivity | Linear project management |
| `stripe/stripe-api` | Stripe | Commerce | Payment processing |
| `datadog/datadog-api` | Datadog | Monitoring | Application monitoring |

---

## 💡 Design Philosophy

### Why Create This Tool?

MCP (Model Context Protocol) is an open protocol launched by Anthropic to standardize how AI assistants connect to external data and tools. As the MCP ecosystem rapidly evolves, developers face several challenges:

1. **Discovery Difficulty** - MCP servers are scattered across different repositories and documentation
2. **Complex Testing** - Manual verification of each server's protocol compliance is required
3. **Tedious Configuration** - Different clients require different configuration formats
4. **Fragmented Deployment** - Lack of unified deployment workflows

**MCP Server Toolkit** was created to solve these problems, providing a one-stop solution from discovery to deployment.

### Architecture

```
mcp-server-toolkit/
├── bin/cli.js              # CLI entry point
├── src/
│   ├── commands/           # Command implementations
│   │   ├── discover.js     # Discovery command
│   │   ├── test.js         # Test command
│   │   ├── config.js       # Config command
│   │   ├── deploy.js       # Deploy command
│   │   ├── list.js         # List command
│   │   ├── info.js         # Info command
│   │   └── init.js         # Init command
│   └── lib/
│       ├── sources/        # Server registry
│       ├── test/           # Testing framework
│       ├── config/         # Config generation
│       └── deploy/         # Deployment tools
├── tests/                  # Test suites
└── configs/                # Config templates
```

### Technology Stack

- **Node.js 18+** - Native ES Modules support
- **Commander.js** - Mature and stable CLI framework
- **Chalk** - Terminal color output
- **Ora** - Elegant loading animations
- **Inquirer** - Interactive command line
- **Jest** - Comprehensive test coverage

---

## 🤝 Contributing

We welcome all forms of contributions!

### Submitting Issues

- Use a clear title to describe the problem
- Provide reproduction steps and environment information
- Attach error logs if applicable

### Submitting Pull Requests

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

### Development Environment

```bash
# Clone the repository
git clone https://github.com/gitstq/mcp-server-toolkit.git
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

### Code Standards

- Use ESLint for code linting
- Use Prettier for code formatting
- Maintain test coverage > 90%

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2026 gitstq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🔗 Related Projects

- [mcp-flow](https://github.com/gitstq/mcp-flow) - MCP flow orchestration engine
- [agent-adapter](https://github.com/gitstq/agent-adapter) - Universal Agent adapter layer
- [awesome-ai-agent-skills](https://github.com/gitstq/awesome-ai-agent-skills) - AI Agent skills collection

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/gitstq">gitstq</a>
</p>
