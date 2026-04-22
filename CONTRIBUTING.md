# Contributing to MCP Server Toolkit

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: git clone https://github.com/<your-username>/mcp-server-toolkit.git
3. Install dependencies: 
pm install
4. Build: 
pm run build
5. Run tests: 
pm test

## Development

This project uses **ES Modules** (Node.js 18+). All source files are located in src/.

`
src/
  commands/     # CLI command implementations
  lib/          # Core library modules
    config/     # Configuration generators
    sources/    # Server registry sources
    test/       # Server testing utilities
  index.js      # Entry point
`

## Making Changes

1. Create a feature branch: git checkout -b feat/my-feature
2. Make your changes
3. Run tests: 
pm test
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - eat: add new server source
   - ix: resolve config generator issue
   - docs: update README
5. Push and open a Pull Request

## Reporting Issues

Please use the [GitHub Issues](https://github.com/gitstq/mcp-server-toolkit/issues) page to report bugs or request features. Include:
- Node.js version
- OS
- Steps to reproduce
- Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.