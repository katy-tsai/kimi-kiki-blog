/**
 * Rehype Plugin: Image Path Transformation
 *
 * Transforms image paths from /public/images/ to /images/ for Next.js compatibility.
 *
 * PATTERN: Unified plugin architecture (similar to remark-plantuml.ts)
 * - Export function that returns transformer
 * - Use visit() to traverse AST nodes
 * - Modify nodes in-place
 *
 * CRITICAL: Operates on HAST (HTML AST), not MDAST
 * - Runs in rehype phase (after HTML conversion)
 * - Matches <img> elements and modifies src attribute
 *
 * Background:
 * - Markdown editors preview images from /public/images/ path
 * - Next.js serves static files from /images/ (public folder is root)
 * - This plugin bridges the gap for seamless editing and rendering
 *
 * @example
 * Input:  <img src="/public/images/screenshot.png" alt="Screenshot" />
 * Output: <img src="/images/screenshot.png" alt="Screenshot" />
 *
 * Reason: Replaces functionality from lib/markdown.ts transformImagePaths()
 */

import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'

/**
 * Rehype plugin to transform image paths
 *
 * @returns Transformer function
 */
const rehypeImagePath: Plugin<[], Root> = () => {
  return (tree) => {
    // PATTERN: Visit all 'element' nodes in the HAST (HTML AST)
    visit(tree, 'element', (node: Element) => {
      // FIND: <img> elements with src attribute
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src as string

        // TRANSFORM: Replace /public/images/ with /images/
        // Reason: Next.js serves /public as root, so /public/images/ → /images/
        if (src.startsWith('/public/images/')) {
          node.properties.src = src.replace('/public/images/', '/images/')

          // GOTCHA: Also handle URL-encoded paths (e.g., %20 for spaces)
          // Example: /public/images/my%20image.png → /images/my%20image.png
        }
      }
    })
  }
}

export default rehypeImagePath
