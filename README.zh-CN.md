# MCP Server Toolkit

<p align="center">
  <img src="https://img.shields.io/npm/v/mcp-server-toolkit?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/MCP-Protocol-orange?style=flat-square" alt="MCP Protocol">
</p>

> 🚀 一站式 MCP 服务器发现、测试与部署工具箱

**MCP Server Toolkit** 是专为 AI 开发者打造的命令行工具集，全面支持 Model Context Protocol (MCP)。提供服务器发现、Schema 测试、配置生成和部署工具，助您轻松管理 MCP 生态。

---

## ✨ 核心特性

| 特性 | 描述 |
|------|------|
| 🔍 **服务器发现** | 从官方注册表和热门来源发现 MCP 服务器 |
| 🧪 **Schema 测试** | 验证 JSON-RPC 2.0 协议合规性和传输健康状态 |
| ⚙️ **配置生成器** | 为 Claude、OpenAI 及自定义 MCP 客户端生成配置 |
| 🚀 **一键部署** | 支持本地、Docker、Vercel、Fly.io 多平台部署 |
| 📦 **项目初始化** | 从模板快速创建新的 MCP 服务器项目 |
| 🗂️ **服务器注册表** | 内置 18+ 官方和热门 MCP 服务器 |

---

## 📦 快速开始

### 全局安装

```bash
npm install -g mcp-server-toolkit
```

### 免安装使用

```bash
npx mcp-toolkit discover
```

### 验证安装

```bash
mcp-toolkit --version
# 输出: 1.0.0
```

---

## 🚀 使用指南

### 1. 发现 MCP 服务器

```bash
# 发现所有可用服务器
mcp-toolkit discover

# 仅查看官方服务器
mcp-toolkit discover --source official

# 按关键词搜索
mcp-toolkit discover --keyword database

# 保存结果到文件
mcp-toolkit discover --output servers.json
```

### 2. 查看服务器详情

```bash
# 列出所有已知服务器
mcp-toolkit list

# 查看特定服务器详情
mcp-toolkit info mcp/github
```

### 3. 测试服务器

```bash
# 测试服务器 Schema 合规性
mcp-toolkit test mcp/github

# 自定义超时时间
mcp-toolkit test mcp/github --timeout 5000

# 详细输出模式
mcp-toolkit test mcp/github --verbose
```

### 4. 生成客户端配置

```bash
# 生成 Claude Desktop 配置
mcp-toolkit config mcp/filesystem --client claude -o claude_desktop_config.json

# 生成 OpenAI 配置
mcp-toolkit config mcp/github --client openai -o openai_config.json

# 生成通用 MCP 客户端配置
mcp-toolkit config mcp/github --client anything -o mcp_config.json
```

### 5. 初始化新项目

```bash
# 使用最小模板创建项目
mcp-toolkit init my-server --template minimal

# 使用完整模板
mcp-toolkit init my-server --template full
```

### 6. 部署服务器

```bash
# Docker 部署
mcp-toolkit deploy ./my-server --platform docker

# Vercel 部署
mcp-toolkit deploy ./my-server --platform vercel

# Fly.io 部署
mcp-toolkit deploy ./my-server --platform flyio
```

---

## 🌐 支持的来源

| 来源 | 描述 | 服务器数量 |
|------|------|-----------|
| `official` | MCP 官方服务器 (Anthropic) | 10 |
| `popular` | 热门第三方集成 | 8 |
| `all` | 全部来源 | 18 |

---

## 🗂️ 服务器注册表

### 官方服务器

| ID | 名称 | 类别 | 描述 |
|----|------|------|------|
| `mcp/filesystem` | Filesystem | 工具 | 文件系统操作 |
| `mcp/github` | GitHub | 集成 | GitHub API 集成 |
| `mcp/brave-search` | Brave Search | 搜索 | Brave 搜索引擎 |
| `mcp/sentry` | Sentry | 监控 | 错误监控 |
| `mcp/slack` | Slack | 通讯 | Slack 消息 |
| `mcp/sqlite` | SQLite | 数据库 | SQLite 数据库 |
| `mcp/postgres` | PostgreSQL | 数据库 | PostgreSQL 数据库 |
| `mcp/aws-kb-retrieval` | AWS KB | AI | AWS 知识库检索 |
| `mcp/google-maps` | Google Maps | 工具 | 地图服务 |
| `mcp/everart` | Everart | AI | AI 图像生成 |

### 热门第三方

| ID | 提供商 | 类别 | 描述 |
|----|--------|------|------|
| `anthropic/claude-code` | Anthropic | AI | Claude Code |
| `alibaba/dashscope` | 阿里巴巴 | AI | 通义千问 |
| `baidu/qianfan` | 百度 | AI | 文心一言 |
| `tencent/cloud` | 腾讯 | AI | 腾讯云 AI |
| `notion/notion-api` | Notion | 生产力 | Notion API |
| `linear/linear-api` | Linear | 生产力 | Linear 项目管理 |
| `stripe/stripe-api` | Stripe | 商业 | 支付处理 |
| `datadog/datadog-api` | Datadog | 监控 | 应用监控 |

---

## 💡 设计思路

### 为什么创建这个工具？

MCP (Model Context Protocol) 是 Anthropic 推出的开放协议，旨在标准化 AI 助手与外部数据、工具的连接方式。随着 MCP 生态快速发展，开发者面临以下挑战：

1. **发现困难** - MCP 服务器分散在不同仓库和文档中
2. **测试复杂** - 需要手动验证每个服务器的协议合规性
3. **配置繁琐** - 不同客户端需要不同格式的配置
4. **部署分散** - 缺乏统一的部署流程

**MCP Server Toolkit** 正是为解决这些问题而生，提供从发现到部署的一站式解决方案。

### 架构设计

```
mcp-server-toolkit/
├── bin/cli.js              # CLI 入口
├── src/
│   ├── commands/           # 命令实现
│   │   ├── discover.js     # 发现命令
│   │   ├── test.js         # 测试命令
│   │   ├── config.js       # 配置命令
│   │   ├── deploy.js       # 部署命令
│   │   ├── list.js         # 列表命令
│   │   ├── info.js         # 详情命令
│   │   └── init.js         # 初始化命令
│   └── lib/
│       ├── sources/        # 服务器注册表
│       ├── test/           # 测试框架
│       ├── config/         # 配置生成
│       └── deploy/         # 部署工具
├── tests/                  # 测试套件
└── configs/                # 配置模板
```

### 技术选型

- **Node.js 18+** - 原生 ES Modules 支持
- **Commander.js** - 成熟稳定的 CLI 框架
- **Chalk** - 终端彩色输出
- **Ora** - 优雅的加载动画
- **Inquirer** - 交互式命令行
- **Jest** - 全面的测试覆盖

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交 Issue

- 使用清晰的标题描述问题
- 提供复现步骤和环境信息
- 附上错误日志（如有）

### 提交 Pull Request

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 开发环境

```bash
# 克隆仓库
git clone https://github.com/gitstq/mcp-server-toolkit.git
cd mcp-server-toolkit

# 安装依赖
npm install

# 运行测试
npm test

# 本地运行
npm start

# 本地链接开发
npm link
```

### 代码规范

- 使用 ESLint 检查代码
- 使用 Prettier 格式化代码
- 保持测试覆盖率 > 90%

---

## 📄 开源协议

本项目采用 [MIT 协议](LICENSE) 开源。

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

## 🔗 相关项目

- [mcp-flow](https://github.com/gitstq/mcp-flow) - MCP 流量编排引擎
- [agent-adapter](https://github.com/gitstq/agent-adapter) - 通用 Agent 适配层
- [awesome-ai-agent-skills](https://github.com/gitstq/awesome-ai-agent-skills) - AI Agent 技能合集

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/gitstq">gitstq</a>
</p>
