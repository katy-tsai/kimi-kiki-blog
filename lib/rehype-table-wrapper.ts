/**
 * Rehype Table Wrapper Plugin
 *
 * Wraps all <table> elements with a scrollable container div.
 *
 * Purpose:
 * - Prevents wide tables from breaking layout
 * - Adds horizontal scrollbar when table exceeds container width
 * - Maintains responsive design on mobile devices
 *
 * Transformation:
 * <table>...</table>
 * →
 * <div class="table-wrapper"><table>...</table></div>
 *
 * Reason: Tables cannot have overflow properties directly;
 * they need a wrapper container to enable horizontal scrolling.
 */

import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

/**
 * Rehype plugin to wrap tables in a scrollable container
 */
export default function rehypeTableWrapper() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      // Find all <table> elements
      if (node.tagName === 'table' && parent && typeof index === 'number') {
        // Create wrapper div with class "table-wrapper"
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['table-wrapper'],
          },
          children: [node], // Wrap the table
        }

        // Replace the table with the wrapper
        parent.children[index] = wrapper
      }
    })
  }
}
