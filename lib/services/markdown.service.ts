import { extractPlainText, calculateReadingTime, generateSlug } from '@/lib/utils/formatting'

/**
 * Type for markdown processing result
 */
export interface MarkdownMetadata {
  readingTimeMinutes: number
  wordCount: number
  plainText: string
  summary: string
}

/**
 * Service for processing and analyzing markdown content
 */
export class MarkdownService {
  /**
   * Generate metadata from markdown content
   */
  static getMetadata(markdown: string): MarkdownMetadata {
    const plainText = extractPlainText(markdown)
    const wordCount = plainText.split(/\s+/).filter(Boolean).length
    const readingTimeMinutes = calculateReadingTime(markdown)
    const summary = this.generateSummary(plainText, 160)

    return {
      readingTimeMinutes,
      wordCount,
      plainText,
      summary,
    }
  }

  /**
   * Generate a summary from content
   */
  static generateSummary(text: string, maxLength: number = 160): string {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || []
    let summary = ''

    for (const sentence of sentences) {
      const trimmed = sentence.trim()
      if (summary.length + trimmed.length <= maxLength) {
        summary += trimmed + ' '
      } else {
        break
      }
    }

    return summary.trim() || text.substring(0, maxLength) + '...'
  }

  /**
   * Count headings in markdown
   */
  static countHeadings(markdown: string): Record<number, number> {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } as Record<number, number>

    const headingRegex = /^(#{1,6})\s+/gm
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length as keyof typeof counts
      counts[level]++
    }

    return counts
  }

  /**
   * Extract code blocks from markdown
   */
  static extractCodeBlocks(markdown: string): string[] {
    const codeRegex = /```(?:\w+)?\n([\s\S]*?)```/g
    const blocks: string[] = []
    let match

    while ((match = codeRegex.exec(markdown)) !== null) {
      blocks.push(match[1].trim())
    }

    return blocks
  }

  /**
   * Extract links from markdown
   */
  static extractLinks(markdown: string): Array<{ text: string; url: string }> {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const links: Array<{ text: string; url: string }> = []
    let match

    while ((match = linkRegex.exec(markdown)) !== null) {
      links.push({ text: match[1], url: match[2] })
    }

    return links
  }

  /**
   * Extract images from markdown
   */
  static extractImages(markdown: string): string[] {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    const images: string[] = []
    let match

    while ((match = imageRegex.exec(markdown)) !== null) {
      images.push(match[2])
    }

    return images
  }

  /**
   * Generate table of contents from markdown headings
   */
  static generateTableOfContents(markdown: string): Array<{ level: number; text: string; slug: string }> {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const toc: Array<{ level: number; text: string; slug: string }> = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length
      const text = match[2]
      const slug = generateSlug(text)

      toc.push({ level, text, slug })
    }

    return toc
  }

  /**
   * Sanitize markdown (remove potentially dangerous elements)
   */
  static sanitize(markdown: string): string {
    // Remove HTML tags
    let sanitized = markdown.replace(/<[^>]*>/g, '')

    // Remove potential script injections
    sanitized = sanitized.replace(/javascript:/gi, '')
    sanitized = sanitized.replace(/on\w+\s*=/gi, '')

    return sanitized
  }

  /**
   * Validate markdown structure
   */
  static isValid(markdown: string): boolean {
    if (!markdown || typeof markdown !== 'string') return false
    if (markdown.trim().length === 0) return false
    return true
  }
}
