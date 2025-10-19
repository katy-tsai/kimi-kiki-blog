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
        let src = node.properties.src as string

        // TRANSFORM: Handle multiple path formats and convert to Next.js format
        // Reason: Different tools may generate different path formats

        // Format 1: ../../public/images/ (relative path from content folder)
        if (src.startsWith('../../public/images/')) {
          src = src.replace('../../public/images/', '/images/')
        }
        // Format 2: /public/images/ (absolute path with /public)
        else if (src.startsWith('/public/images/')) {
          src = src.replace('/public/images/', '/images/')
        }
        // Format 3: public/images/ (without leading slash)
        else if (src.startsWith('public/images/')) {
          src = src.replace('public/images/', '/images/')
        }

        // Update the src attribute
        node.properties.src = src

        // GOTCHA: URL-encoded paths (e.g., %20 for spaces) are preserved
        // Example: /public/images/my%20image.png → /images/my%20image.png
      }
    })
  }
}

export default rehypeImagePath
