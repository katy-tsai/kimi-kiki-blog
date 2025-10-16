## blog-initialization.md 的Bugs

- [x] HeroBanner 圖檔沒有RWD, 螢幕小於1400會摭住 [問題](./img/banner.png)

### 問題分析

**根本原因**：

1. `hero-banner__image` 使用 `position: absolute` 並透過 `transform: translate(50%, 80px)` 定位在右下角
2. 在小螢幕下（< 1400px），圖片仍保持相同的絕對定位和位移，導致溢出容器並遮蔽內容
3. 沒有針對中小螢幕提供響應式調整（目前只有 768px 的斷點處理容器 padding）

**參考文件**：

- CLAUDE.md 響應式斷點規範：xs(320px) / sm(640px) / md(768px) / lg(1024px) / xl(1280px)
- CSS Variables：scss/core/theme/_variables.scss:214-220

### 解決步驟

#### 1. 修改 SCSS 樣式檔案

**檔案**：`scss/components/_hero-banner.scss`

**操作**：在 `.hero-banner__image` 區塊中新增多個響應式斷點

```scss
&__image {
  position: absolute;
  max-width: 100%;
  height: auto;
  bottom: 0;
  right: 0px;
  transform: translate(50%, 80px);

  // 中型螢幕 (1024px - 1400px) - 縮小圖片並調整位置
  @media (max-width: 1400px) {
    width: 350px;
    height: auto;
    transform: translate(40%, 60px);
  }

  // 平板螢幕 (768px - 1024px) - 進一步縮小
  @media (max-width: 1024px) {
    width: 280px;
    transform: translate(30%, 40px);
  }

  // 手機螢幕 (< 768px) - 隱藏或完全重新定位
  @media (max-width: 768px) {
    display: none; // 選項 1: 直接隱藏

    // 選項 2: 改為置中靜態顯示（擇一使用）
    // position: static;
    // transform: none;
    // margin: var(--spacing-6) auto 0;
    // width: 240px;
    // display: block;
  }
}
```

**Reason**：

- 使用漸進式響應式設計，在不同斷點逐步調整圖片大小和位置
- 手機版提供兩個選項：隱藏或改為靜態顯示，避免佈局混亂
- 遵循專案的響應式斷點標準（CLAUDE.md 定義）

#### 2. (可選) 優化容器溢出處理

**檔案**：`scss/components/_hero-banner.scss`

**操作**：在 `.hero-banner` 區塊中新增溢出控制

```scss
.hero-banner {
  // ... 現有樣式 ...
  overflow: hidden; // 防止圖片溢出容器

  // 或使用
  // overflow-x: hidden; // 只限制水平溢出
}
```

**Reason**：作為額外保護，確保即使圖片定位異常也不會破壞整體佈局

#### 3. 測試驗證

**測試範圍**：

- [ ] 桌面 (> 1400px)：圖片正常顯示在右下角
- [ ] 中型螢幕 (1024px - 1400px)：圖片縮小且不遮蔽文字
- [ ] 平板 (768px - 1024px)：圖片進一步縮小或調整位置
- [ ] 手機 (< 768px)：圖片隱藏或靜態顯示於內容下方
- [ ] 深色/淺色模式：確保在兩種主題下都正常顯示

**測試方法**：

```bash
# 啟動開發伺服器
npm run dev

# 使用瀏覽器 DevTools 測試不同螢幕尺寸
# Chrome DevTools > Toggle Device Toolbar (Cmd/Ctrl + Shift + M)
# 測試以下尺寸：
# - 1920px (Desktop)
# - 1366px (Laptop)
# - 1024px (Tablet Landscape)
# - 768px (Tablet Portrait)
# - 375px (Mobile)
```

#### 4. (進階優化) 使用 Next.js Image 響應式屬性

**檔案**：`components/home/HeroBanner.tsx`

**操作**：可考慮使用 Next.js Image 的響應式功能

```tsx
<Image
  src="/images/banner.png"
  alt="kimi-kiki 技術部落格橫幅圖片"
  width={400}
  height={300}
  priority
  className="hero-banner__image"
  sizes="(max-width: 768px) 0px, (max-width: 1024px) 280px, (max-width: 1400px) 350px, 400px"
/>
```

**Reason**：

- `sizes` 屬性可讓 Next.js 根據螢幕大小載入適當尺寸的圖片
- 搭配 CSS `display: none` 時，手機版會完全不載入圖片，提升效能
- 符合 CLAUDE.md 的效能優化建議

### 實作檢查清單

- [ ] 修改 `scss/components/_hero-banner.scss` 新增響應式斷點
- [ ] 新增 `overflow: hidden` 防止溢出（可選）
- [ ] 測試所有斷點的顯示效果
- [ ] 確認深色/淺色模式都正常
- [ ] (可選) 優化 Next.js Image 的 sizes 屬性
- [ ] 提交變更：`git commit -m "fix(ui): 修復 HeroBanner 圖片在小螢幕的 RWD 問題"`

### 相關文件

- 專案規範：CLAUDE.md - 響應式設計章節
- CSS Variables：scss/core/theme/_variables.scss
- Next.js Image 文件：<https://nextjs.org/docs/app/api-reference/components/image>
- 響應式圖片最佳實踐：<https://web.dev/responsive-images/>
