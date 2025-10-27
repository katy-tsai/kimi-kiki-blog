#!/bin/bash

# SEO Testing Script
# 用於測試 Next.js 靜態生成是否正確

set -e

echo "🔍 SEO 測試工具"
echo "==============="
echo ""

# 顏色定義
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查是否已 build
if [ ! -d ".next" ]; then
  echo "${RED}❌ 錯誤：找不到 .next 目錄${NC}"
  echo "請先執行: npm run build"
  exit 1
fi

echo "${GREEN}✓${NC} 找到 .next 目錄"
echo ""

# 檢查 production server 是否運行
echo "檢查 production server..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "${RED}❌ 錯誤：無法連線到 http://localhost:3000${NC}"
  echo "請先執行: npm start"
  exit 1
fi

echo "${GREEN}✓${NC} Production server 正在運行"
echo ""

# 測試首頁
echo "📄 測試首頁 (/)..."
HOMEPAGE_HTML=$(curl -s http://localhost:3000)

if echo "$HOMEPAGE_HTML" | grep -q "最新文章"; then
  echo "${GREEN}✓${NC} 首頁包含 '最新文章' 標題"
else
  echo "${RED}✗${NC} 首頁缺少 '最新文章' 標題"
fi

if echo "$HOMEPAGE_HTML" | grep -q "article-card"; then
  echo "${GREEN}✓${NC} 首頁包含文章卡片"
else
  echo "${RED}✗${NC} 首頁缺少文章卡片"
fi

echo ""

# 測試文章頁（取得第一篇文章）
echo "📝 測試文章頁..."

# 從首頁 HTML 中提取第一個文章連結
FIRST_POST=$(echo "$HOMEPAGE_HTML" | grep -oP '/posts/[^"]+' | head -1)

if [ -z "$FIRST_POST" ]; then
  echo "${YELLOW}⚠${NC} 無法找到文章連結，跳過文章頁測試"
else
  echo "測試文章: $FIRST_POST"
  POST_HTML=$(curl -s "http://localhost:3000$FIRST_POST")

  if echo "$POST_HTML" | grep -q "post-container"; then
    echo "${GREEN}✓${NC} 文章頁包含文章容器"
  else
    echo "${RED}✗${NC} 文章頁缺少文章容器"
  fi

  if echo "$POST_HTML" | grep -q "post-content"; then
    echo "${GREEN}✓${NC} 文章頁包含文章內容"
  else
    echo "${RED}✗${NC} 文章頁缺少文章內容"
  fi
fi

echo ""

# 測試標籤頁
echo "🏷️  測試標籤頁 (/tags)..."
TAGS_HTML=$(curl -s http://localhost:3000/tags)

if echo "$TAGS_HTML" | grep -q "所有標籤"; then
  echo "${GREEN}✓${NC} 標籤頁包含標題"
else
  echo "${RED}✗${NC} 標籤頁缺少標題"
fi

if echo "$TAGS_HTML" | grep -q "tag-card"; then
  echo "${GREEN}✓${NC} 標籤頁包含標籤卡片"
else
  echo "${RED}✗${NC} 標籤頁缺少標籤卡片"
fi

echo ""

# 測試 Meta Tags
echo "🔖 測試 Meta Tags..."

if echo "$HOMEPAGE_HTML" | grep -q '<meta name="description"'; then
  echo "${GREEN}✓${NC} 首頁包含 description meta tag"
else
  echo "${RED}✗${NC} 首頁缺少 description meta tag"
fi

if echo "$HOMEPAGE_HTML" | grep -q '<meta name="keywords"'; then
  echo "${GREEN}✓${NC} 首頁包含 keywords meta tag"
else
  echo "${YELLOW}⚠${NC} 首頁缺少 keywords meta tag (非必要)"
fi

echo ""
echo "✅ 測試完成！"
echo ""
echo "💡 提示："
echo "1. 如果看到 ${RED}✗${NC}，表示該項目未通過測試"
echo "2. 請檢查元件是否為 Server Component"
echo "3. 確認頁面有設定 'export const dynamic = \"force-static\"'"
echo ""
echo "🔗 更多資訊請參考: SEO_OPTIMIZATION.md"
