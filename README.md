# Context Engineering 模板 (中文版)

這是一個全面的模板，幫助你快速開始 Context Engineering —— 這是一門專門為 AI 程式助理設計「上下文」的工程方法，確保 AI 有足夠的資訊來完成從頭到尾的工作。

> **Context Engineering 比 Prompt Engineering 強 10 倍，比隨意寫程式 (vibe coding) 強 100 倍。**

## 🚀 Quick Start

```bash
# 1. 複製此模板
git clone https://github.com/coleam00/Context-Engineering-Intro.git
cd Context-Engineering-Intro

# 2. 設定專案規則（可選 - 模板已提供）
# 編輯 CLAUDE.md 來新增專案專屬的指引

# 3. 新增範例（強烈建議）
# 將相關程式碼範例放到 examples/ 資料夾

# 4. 建立初始功能需求
# 編輯 INITIAL.md，寫下功能需求

# 5. 產生完整的 PRP（產品需求提示）
# 在 Claude Code 中執行：
/generate-prp INITIAL.md

# 6. 執行 PRP 來實作功能
# 在 Claude Code 中執行：
/execute-prp PRPs/your-feature-name.md

```

## 📚 Table of Contents

- [What is Context Engineering?](#what-is-context-engineering)
- [Template Structure](#template-structure)
- [Step-by-Step Guide](#step-by-step-guide)
- [Writing Effective INITIAL.md Files](#writing-effective-initialmd-files)
- [The PRP Workflow](#the-prp-workflow)
- [Using Examples Effectively](#using-examples-effectively)
- [Best Practices](#best-practices)

## What is Context Engineering?

Context Engineering represents a paradigm shift from traditional prompt engineering:

### Prompt Engineering vs Context Engineering

**Prompt Engineering:**

- 專注於精巧的措辭與表達方式
- 僅限於任務的「描述方式」
- 好比給人一張便利貼

**Context Engineering:**

- 提供完整的上下文系統
- 包含文件、範例、規則、模式與驗證
- 就像寫一部完整的劇本，細節都備齊

### 為什麼 Context Engineering 重要？

1. *降低 AI 失敗率**: 大部分 AI 失敗並不是模型問題，而是缺乏上下文
2. **確保一致性**: AI 會遵循你的專案規範與慣例
3. **支援複雜功能**: 有完整上下文時，AI 能處理多步驟實作
4. **自我修正**: 透過驗證迴圈，AI 能自動修正錯誤

## Template Structure

```
context-engineering-intro/
├── .claude/
│   ├── commands/
│   │   ├── generate-prp.md    # 產生 PRP
│   │   └── execute-prp.md     # 執行 PRP 實作功能
│   └── settings.local.json    # Claude Code 權限
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md        # PRP 基礎模板
│   └── EXAMPLE_multi_agent_prp.md  # 完整 PRP 範例
├── examples/                  # 範例程式碼（非常重要！）
├── CLAUDE.md                  # 專案全域規則
├── INITIAL.md                 # 初始功能需求
├── INITIAL_EXAMPLE.md         # 初始需求範例
└── README.md                  # 本文件

```

This template doesn't focus on RAG and tools with context engineering because I have a LOT more in store for that soon. ;)

## 逐步操作指南

### 1. Set Up Global Rules (CLAUDE.md)

CLAUDE.md 用來定義 AI 助理在專案中必須遵守的規範，例如：

- **專案認知**:讀取計劃文件、檢查任務
- **程式結構**: 檔案大小限制、模組組織方式
- **測試需求**: 單元測試模式與覆蓋率
- **程式風格**: 語言偏好、格式化規則
- **文件標準**: docstring 格式、註解習慣

**You can use the provided template as-is or customize it for your project.**

### 2. Create Your Initial Feature Request

編輯 INITIAL.md，描述你要開發的功能：

```markdown
## FEATURE:
[描述你要開發的功能，具體列出需求]

## EXAMPLES:
[列出 examples/ 內的相關範例，說明如何使用]

## DOCUMENTATION:
[附上相關文件、API 或 MCP server 資源]

## OTHER CONSIDERATIONS:
[列出注意事項、需求、常見錯誤]

```


### 3. 產生 PRP

PRP（Product Requirements Prompt, 產品需求提示）是一份完整的 實作藍圖，包含：

- 全部上下文與文件
- 實作步驟與驗證
- 錯誤處理模式
- 測試需求


```bash
/generate-prp INITIAL.md

```



### 4. Execute the PRP

產生後，直接執行 PRP 進行實作：

```bash
/execute-prp PRPs/your-feature-name.md
```


### 撰寫有效 INITIAL.md 的技巧

**FEATURE**: 要具體明確：

- ❌ 「建立一個爬蟲」
- ✅ 「建立一個非同步爬蟲，使用 BeautifulSoup 抓取電商商品資料，支援速率限制，並將結果存入 PostgreSQL」

**EXAMPLES**: Leverage the examples/ folder

- 放在 examples/ 內
- 指出要模仿哪些模式
- 包含「應該怎麼做」與「不應該怎麼做」
 
**DOCUMENTATION**: Include all relevant resources

- API 官方文件
- 函式庫教學
- MCP server 文件
- 資料庫結構

**OTHER CONSIDERATIONS**: Capture important details

- 認證需求
- 流量限制
- 常見陷阱
- 效能需求



## 有效使用範例（Using Examples Effectively）

examples/ 資料夾對成功至關重要。
AI 程式助理在能看到可遵循的模式時，表現會好得多。

### 範例中應包含的內容（What to Include in Examples）

1. **程式結構模式**
   - 模組的組織方式
   - 匯入（import）的慣例
   - 類別/函式的設計模式

2. **測試模式**
   - 測試檔案的結構
   - 模擬（mocking）的方式
   - 斷言（assertion）的風格
3. **整合模式**
   - API 客戶端實作方式
   - 資料庫連線方式
   - 驗證（authentication）流程
4. **CLI 模式**
   - 參數解析（argument parsing）
   - 輸出格式化
   - 錯誤處理方式
  
###範例結構

```
examples/
├── README.md           # 說明每個範例展示的內容
├── cli.py              # CLI 實作模式
├── agent/              # Agent 架構模式
│   ├── agent.py        # Agent 建立模式
│   ├── tools.py        # 工具實作模式
│   └── providers.py    # 多供應商模式
└── tests/              # 測試模式
    ├── test_agent.py   # 單元測試模式
    └── conftest.py     # Pytest 設定

```

## 最佳實踐

### 1. 在 INITIAL.md 中明確說明

- 不要假設 AI 了解你的偏好
- 包含具體的需求與限制條件
- 充分引用範例

### 2. 提供完整的範例

- 更多範例 = 更好的實作結果
- 展示「應該怎麼做」以及「不應該怎麼做」
- 包含錯誤處理模式

### 3. 使用驗證關卡 (Validation Gates)

- PRP 必須包含需要通過的測試指令
- AI 會不斷迭代直到所有驗證成功
- 確保程式在第一次交付時即可正常運作

### 4. 善用文件資源

- 包含官方 API 文件
- 加入 MCP server 的相關資源
- 引用具體的文件章節

### 5. 自訂 CLAUDE.md

- 加入你的專案慣例
- 包含專案特有的規則
- 定義程式碼風格標準

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Context Engineering Best Practices](https://www.philschmid.de/context-engineering)