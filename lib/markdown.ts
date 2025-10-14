/**
 * Markdown Parsing Utilities
 *
 * Functions for parsing markdown content with frontmatter and converting to HTML.
 *
 * Uses:
 * - gray-matter: Parse YAML frontmatter
 * - remark: Convert markdown to HTML
 * - remark-html: HTML output plugin for remark
 */

import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { PostFrontmatter } from '@/types/post'

interface ParsedMarkdown {
  frontmatter: PostFrontmatter
  content: string
  html: string
}

/**
 * Parse markdown content with frontmatter
 *
 * @param content - Raw markdown content with frontmatter
 * @returns Parsed frontmatter, raw content, and HTML content
 */
/**
 * Add IDs to headings in HTML for anchor links
 *
 * Reason: Enable TOC links to work by adding IDs to h2 and h3 elements
 */
function addHeadingIds(html: string): string {
  return html.replace(/<h([23])>(.*?)<\/h\1>/gi, (_match, level, text) => {
    // Reason: Strip HTML tags and generate URL-safe ID
    const plainText = text.replace(/<[^>]*>/g, '')
    const id = plainText
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5\-]/g, '') // Support Chinese characters
      .substring(0, 50) // Limit length

    return `<h${level} id="${id}">${text}</h${level}>`
  })
}

export async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
  try {
    // Reason: gray-matter parses YAML frontmatter and separates it from content
    const { data, content: markdownContent } = matter(content)

    // Reason: remark converts markdown to HTML with plugins
    const processedContent = await remark()
      .use(html)
      .process(markdownContent)

    let htmlContent = processedContent.toString()

    // Reason: Add IDs to headings for TOC anchor links
    htmlContent = addHeadingIds(htmlContent)

    return {
      frontmatter: data as PostFrontmatter,
      content: markdownContent,
      html: htmlContent,
    }
  } catch (error) {
    console.error('Error parsing markdown:', error)
    throw new Error('Failed to parse markdown content')
  }
}
