/**
 * Remark plugin to transform PlantUML code blocks into rendered SVG images
 *
 * PATTERN: Unified plugin architecture
 * - Export function that returns transformer
 * - Use visit() to traverse AST nodes
 * - Modify nodes in-place
 *
 * Features:
 * - Transforms plantuml code blocks to SVG images
 * - Uses PlantUML public server for rendering
 * - Graceful error handling with fallback
 * - Responsive image styling
 *
 * @example
 * ```typescript
 * import { remark } from 'remark'
 * import remarkPlantUML from './remark-plantuml'
 *
 * const processor = remark().use(remarkPlantUML)
 * ```
 *
 * Reason: Custom plugin for PlantUML diagram rendering in blog posts
 */

import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Code } from 'mdast'
import plantumlEncoder from 'plantuml-encoder'

/**
 * Plugin configuration options
 */
interface PluginOptions {
  /**
   * Base URL for PlantUML server
   * @default 'https://www.plantuml.com/plantuml/svg'
   */
  baseUrl?: string
}

/**
 * Remark plugin to transform PlantUML code blocks into rendered SVG images
 *
 * @param options - Plugin configuration
 * @param options.baseUrl - PlantUML server URL (default: plantuml.com SVG endpoint)
 * @returns Transformer function
 */
const remarkPlantUML: Plugin<[PluginOptions?], Root> = (options = {}) => {
  // Reason: Provide sensible default for PlantUML server
  const baseUrl = options.baseUrl || 'https://www.plantuml.com/plantuml/svg'

  return (tree) => {
    // PATTERN: Visit all 'code' nodes in the AST
    visit(tree, 'code', (node: Code) => {
      // Reason: Only process code blocks with lang='plantuml'
      if (node.lang !== 'plantuml') {
        return // Skip non-plantuml blocks
      }

      try {
        // CRITICAL: Encode PlantUML source to URL-safe string
        const encoded = plantumlEncoder.encode(node.value)

        // Reason: Construct full image URL
        const imageUrl = `${baseUrl}/${encoded}`

        // Reason: Generate responsive HTML img tag
        // - alt text for accessibility
        // - max-width:100% for responsive design (matches CLAUDE.md guidelines)
        // - loading=lazy for performance
        const htmlValue = `<img src="${imageUrl}" alt="PlantUML Diagram" style="max-width:100%" loading="lazy" />`

        // CRITICAL: Transform node type from 'code' to 'html'
        // Reason: remark-html will preserve 'html' nodes as-is
        Object.assign(node, {
          type: 'html',
          value: htmlValue,
        })
      } catch (error) {
        // GOTCHA: If encoding fails, log error but don't crash
        // FALLBACK: Leave original code block unchanged
        console.error('Failed to encode PlantUML diagram:', error)
        // Node remains as 'code' type, will be rendered as code block
      }
    })
  }
}

export default remarkPlantUML
