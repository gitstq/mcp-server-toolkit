# MCP Server Toolkit

<p align="center">
  <img src="https://img.shields.io/npm/v/mcp-server-toolkit?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/MCP-Protocol-orange?style=flat-square" alt="MCP Protocol">
</p>

> 🚀 一站式 MCP 伺服器發現、測試與部署工具箱

**MCP Server Toolkit** 是專為 AI 開發者打造的命令列工具集，全面支援 Model Context Protocol (MCP)。提供伺服器發現、Schema 測試、配置生成和部署工具，助您輕鬆管理 MCP 生態。

---

## ✨ 核心特性

| 特性 | 描述 |
|------|------|
| 🔍 **伺服器發現** | 從官方註冊表和熱門來源發現 MCP 伺服器 |
| 🧪 **Schema 測試** | 驗證 JSON-RPC 2.0 協議合規性和傳輸健康狀態 |
| ⚙️ **配置生成器** | 為 Claude、OpenAI 及自定義 MCP 客戶端生成配置 |
| 🚀 **一鍵部署** | 支援本地、Docker、Vercel、Fly.io 多平台部署 |
| 📦 **專案初始化** | 從模板快速建立新的 MCP 伺服器專案 |
| 🗂️ **伺服器註冊表** | 內建 18+ 官方和熱門 MCP 伺服器 |

---

## 📦 快速開始

### 全域安裝

```bash
npm install -g mcp-server-toolkit
```

### 免安裝使用

```bash
npx mcp-toolkit discover
```

### 驗證安裝

```bash
mcp-toolkit --version
# 輸出: 1.0.0
```

---

## 🚀 使用指南

### 1. 發現 MCP 伺服器

```bash
# 發現所有可用伺服器
mcp-toolkit discover

# 僅查看官方伺服器
mcp-toolkit discover --source official

# 按關鍵詞搜尋
mcp-toolkit discover --keyword database

# 儲存結果到檔案
mcp-toolkit discover --output servers.json
```

### 2. 查看伺服器詳情

```bash
# 列出所有已知伺服器
mcp-toolkit list

# 查看特定伺服器詳情
mcp-toolkit info mcp/github
```

### 3. 測試伺服器

```bash
# 測試伺服器 Schema 合規性
mcp-toolkit test mcp/github

# 自定義超時時間
mcp-toolkit test mcp/github --timeout 5000

# 詳細輸出模式
mcp-toolkit test mcp/github --verbose
```

### 4. 生成客戶端配置

```bash
# 生成 Claude Desktop 配置
mcp-toolkit config mcp/filesystem --client claude -o claude_desktop_config.json

# 生成 OpenAI 配置
mcp-toolkit config mcp/github --client openai -o openai_config.json

# 生成通用 MCP 客戶端配置
mcp-toolkit config mcp/github --client anything -o mcp_config.json
```

### 5. 初始化新專案

```bash
# 使用最小模板建立專案
mcp-toolkit init my-server --template minimal

# 使用完整模板
mcp-toolkit init my-server --template full
```

### 6. 部署伺服器

```bash
# Docker 部署
mcp-toolkit deploy ./my-server --platform docker

# Vercel 部署
mcp-toolkit deploy ./my-server --platform vercel

# Fly.io 部署
mcp-toolkit deploy ./my-server --platform flyio
```

---

## 🌐 支援的來源

| 來源 | 描述 | 伺服器數量 |
|------|------|-----------|
| `official` | MCP 官方伺服器 (Anthropic) | 10 |
| `popular` | 熱門第三方整合 | 8 |
| `all` | 全部來源 | 18 |

---

## 🗂️ 伺服器註冊表

### 官方伺服器

| ID | 名稱 | 類別 | 描述 |
|----|------|------|------|
| `mcp/filesystem` | Filesystem | 工具 | 檔案系統操作 |
| `mcp/github` | GitHub | 整合 | GitHub API 整合 |
| `mcp/brave-search` | Brave Search | 搜尋 | Brave 搜尋引擎 |
| `mcp/sentry` | Sentry | 監控 | 錯誤監控 |
| `mcp/slack` | Slack | 通訊 | Slack 訊息 |
| `mcp/sqlite` | SQLite | 資料庫 | SQLite 資料庫 |
| `mcp/postgres` | PostgreSQL | 資料庫 | PostgreSQL 資料庫 |
| `mcp/aws-kb-retrieval` | AWS KB | AI | AWS 知識庫檢索 |
| `mcp/google-maps` | Google Maps | 工具 | 地圖服務 |
| `mcp/everart` | Everart | AI | AI 影像生成 |

### 熱門第三方

| ID | 提供商 | 類別 | 描述 |
|----|--------|------|------|
| `anthropic/claude-code` | Anthropic | AI | Claude Code |
| `alibaba/dashscope` | 阿里巴巴 | AI | 通義千問 |
| `baidu/qianfan` | 百度 | AI | 文心一言 |
| `tencent/cloud` | 騰訊 | AI | 騰訊雲 AI |
| `notion/notion-api` | Notion | 生產力 | Notion API |
| `linear/linear-api` | Linear | 生產力 | Linear 專案管理 |
| `stripe/stripe-api` | Stripe | 商業 | 支付處理 |
| `datadog/datadog-api` | Datadog | 監控 | 應用監控 |

---

## 💡 設計思路

### 為什麼建立這個工具？

MCP (Model Context Protocol) 是 Anthropic 推出的開放協議，旨在標準化 AI 助手與外部資料、工具的連線方式。隨著 MCP 生態快速發展，開發者面臨以下挑戰：

1. **發現困難** - MCP 伺服器分散在不同倉庫和文件中
2. **測試複雜** - 需要手動驗證每個伺服器的協議合規性
3. **配置繁瑣** - 不同客戶端需要不同格式的配置
4. **部署分散** - 缺乏統一的部署流程

**MCP Server Toolkit** 正是為解決這些問題而生，提供從發現到部署的一站式解決方案。

### 架構設計

```
mcp-server-toolkit/
├── bin/cli.js              # CLI 入口
├── src/
│   ├── commands/           # 命令實現
│   │   ├── discover.js     # 發現命令
│   │   ├── test.js         # 測試命令
│   │   ├── config.js       # 配置命令
│   │   ├── deploy.js       # 部署命令
│   │   ├── list.js         # 列表命令
│   │   ├── info.js         # 詳情命令
│   │   └── init.js         # 初始化命令
│   └── lib/
│       ├── sources/        # 伺服器註冊表
│       ├── test/           # 測試框架
│       ├── config/         # 配置生成
│       └── deploy/         # 部署工具
├── tests/                  # 測試套件
└── configs/                # 配置模板
```

### 技術選型

- **Node.js 18+** - 原生 ES Modules 支援
- **Commander.js** - 成熟穩定的 CLI 框架
- **Chalk** - 終端彩色輸出
- **Ora** - 優雅的載入動畫
- **Inquirer** - 互動式命令列
- **Jest** - 全面的測試覆蓋

---

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！

### 提交 Issue

- 使用清晰的標題描述問題
- 提供復現步驟和環境資訊
- 附上錯誤日誌（如有）

### 提交 Pull Request

1. Fork 本倉庫
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 建立 Pull Request

### 開發環境

```bash
# 克隆倉庫
git clone https://github.com/gitstq/mcp-server-toolkit.git
cd mcp-server-toolkit

# 安裝依賴
npm install

# 執行測試
npm test

# 本地執行
npm start

# 本地連結開發
npm link
```

### 程式碼規範

- 使用 ESLint 檢查程式碼
- 使用 Prettier 格式化程式碼
- 保持測試覆蓋率 > 90%

---

## 📄 開源協議

本專案採用 [MIT 協議](LICENSE) 開源。

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

## 🔗 相關專案

- [mcp-flow](https://github.com/gitstq/mcp-flow) - MCP 流量編排引擎
- [agent-adapter](https://github.com/gitstq/agent-adapter) - 通用 Agent 適配層
- [awesome-ai-agent-skills](https://github.com/gitstq/awesome-ai-agent-skills) - AI Agent 技能合集

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/gitstq">gitstq</a>
</p>
