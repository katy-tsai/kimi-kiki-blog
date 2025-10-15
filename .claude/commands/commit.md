# AI Commit Command

請分析程式碼變更並生成符合以下規範的 commit message:


## 🔄 Git Commit 規範

使用 **Conventional Commits** 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 類型

| Type | 說明 | 範例 |
|------|------|------|
| `feat` | 新功能 | `feat: 新增使用者登入功能` |
| `fix` | Bug 修復 | `fix: 修復購物車數量計算錯誤` |
| `docs` | 文件更新 | `docs: 更新 API 文件` |
| `style` | 樣式調整 | `style: 調整按鈕樣式` |
| `refactor` | 重構 | `refactor: 重構商品列表元件` |
| `perf` | 效能優化 | `perf: 優化圖片載入速度` |
| `test` | 測試 | `test: 新增 Button 元件測試` |
| `chore` | 雜項 | `chore: 更新依賴套件` |
| `ci` | CI/CD | `ci: 新增自動部署設定` |

### Commit 範例

```bash
# 簡單 commit
git commit -m "feat: 新增文章搜尋功能"

# 詳細 commit
git commit -m "feat(search): 新增文章搜尋功能

- 實作搜尋輸入框
- 新增防抖處理
- 支援標籤篩選

Closes #123"
```
