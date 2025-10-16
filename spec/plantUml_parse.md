## FEATURE:

markdown 中有plantUml的code，轉成圖檔

**PRP Location**: `/PRPs/plantuml-parse.md`
**PRP Completed**: 2025-10-16
**Status**: Ready for Implementation

## DOCUMENTATION:

- 使用 markdown-it 插件

```bash
npm install markdown-it plantuml-encoder
```
#### Example

```javascript
// lib/markdown.js
import MarkdownIt from 'markdown-it';
import plantumlEncoder from 'plantuml-encoder';

const md = new MarkdownIt();

// 自定義 PlantUML 規則
md.use((md) => {
  md.fences.push({
    name: 'plantuml',
    parse: function(state, startLine, endLine, silent) {
      // 標準的 fence parse 邏輯
    }
  });
});

md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  const token = tokens[idx];

  if (token.info === 'plantuml') {
    const code = token.content;
    const encoded = plantumlEncoder.encode(code);
    const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
    return `<img src="${url}" alt="diagram" style="max-width:100%" />`;
  }

  return slf.renderToken(tokens, idx, options);
};

export function renderMarkdown(content) {
  return md.render(content);
}
```
