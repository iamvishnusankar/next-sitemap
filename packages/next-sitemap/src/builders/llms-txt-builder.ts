/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { IConfig, ILLMsSection } from '../interface.js'

/**
 * Builder class to generate llms.txt content
 * Returns only string values
 */
export class LLMsTxtBuilder {
  /**
   * Escape HTML characters in text
   * @param s String to escape
   * @returns Escaped string
   */
  private escapeHtml(s: string): string {
    try {
      if (!s || typeof s !== 'string') {
        return ''
      }
      return s.replace(/[^\dA-Za-z ]/g, (c) => '&#' + c.charCodeAt(0) + ';')
    } catch (e: unknown) {
      console.warn('Error escaping HTML:', e)
      return s || ''
    }
  }

  /**
   * Format date to ISO format
   * @param date Date object or string
   * @returns Formatted date string
   */
  private formatDate(date: Date | string): string {
    try {
      const d = typeof date === 'string' ? new Date(date) : date
      const z = (n) => ('0' + n).slice(-2)
      const zz = (n) => ('00' + n).slice(-3)
      let off = d.getTimezoneOffset()
      const sign = off > 0 ? '-' : '+'
      off = Math.abs(off)

      return (
        d.getFullYear() +
        '-' +
        z(d.getMonth() + 1) +
        '-' +
        z(d.getDate()) +
        'T' +
        z(d.getHours()) +
        ':' +
        z(d.getMinutes()) +
        ':' +
        z(d.getSeconds()) +
        '.' +
        zz(d.getMilliseconds()) +
        sign +
        z((off / 60) | 0) +
        ':' +
        z(off % 60)
      )
    } catch (e: unknown) {
      console.warn('Error formatting date:', e)
      return new Date().toISOString()
    }
  }

  /**
   * Generate a link entry in a section
   * @param link Link object with title, url and optional details
   * @returns Markdown formatted link
   */
  buildLinkMd(link: { title: string; url: string; details?: string }): string {
    try {
      if (!link || !link.title || !link.url) {
        console.warn('Missing required link properties (title or url)')
        return ''
      }
      
      let linkMd = `- [${this.escapeHtml(link.title)}](${link.url})`
      
      if (link.details) {
        linkMd += ` - ${this.escapeHtml(link.details)}`
      }
      
      return linkMd
    } catch (e: unknown) {
      console.warn('Error building link markdown:', e)
      return ''
    }
  }

  /**
   * Format a section with title and links
   * @param section Section object
   * @returns Markdown formatted section
   */
  buildSectionMd(section: ILLMsSection): string {
    try {
      if (!section || !section.title) {
        console.warn('Missing required section properties (title)')
        return ''
      }
      
      let sectionMd = `## ${this.escapeHtml(section.title)}`
      
      if (section.isOptional) {
        sectionMd += ' (optional)'
      }
      
      sectionMd += '\n\n'
      
      // Add all links
      if (section.links && Array.isArray(section.links)) {
        section.links.forEach(link => {
          const linkMd = this.buildLinkMd(link)
          if (linkMd) {
            sectionMd += `${linkMd}\n`
          }
        })
      }
      
      return sectionMd
    } catch (e: unknown) {
      console.warn('Error building section markdown:', e)
      return ''
    }
  }

  /**
   * Build header content with title and description
   * @param title Title of the llms.txt
   * @param description Optional description
   * @returns Markdown formatted header
   */
  buildHeaderMd(title: string, description?: string): string {
    try {
      if (!title) {
        console.warn('Missing required title for llms.txt')
        return '# Website\n\n'
      }
      
      // Start with the title (H1)
      let content = `# ${this.escapeHtml(title)}\n\n`
      
      // Add description as blockquote if provided
      if (description) {
        content += `> ${this.escapeHtml(description)}\n\n`
      }
      
      return content
    } catch (e: unknown) {
      console.warn('Error building header markdown:', e)
      return '# Website\n\n'
    }
  }

  /**
   * Add generator attribution to the content
   * @returns Markdown formatted attribution
   */
  buildAttributionMd(): string {
    return `\n---\n\n*Generated using [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)*\n`
  }

  /**
   * Generates llms.txt content in Markdown format following the llmstxt.org specification
   * @param config
   * @returns Markdown formatted llms.txt content
   */
  generateLLMsTxt(config: IConfig): string {
    try {
      if (!config || !config.llmsTxtOptions) {
        throw new Error('Missing llmsTxtOptions in config')
      }
      
      const { title, description, details, sections } = config.llmsTxtOptions
      
      if (!title) {
        throw new Error('Missing required title in llmsTxtOptions')
      }
      
      // Build header with title and description
      let content = this.buildHeaderMd(title, description)
      
      // Add additional details if provided
      if (details) {
        content += `${details}\n\n`
      }
      
      // Add sections if provided
      if (sections && sections.length > 0) {
        sections.forEach(section => {
          content += `${this.buildSectionMd(section)}\n`
        })
      }
      
      // Add generator attribution
      content += this.buildAttributionMd()
      
      return content
    } catch (e: unknown) {
      console.error('Error generating llms.txt:', e)
      const errorMessage = e instanceof Error ? e.message : String(e)
      return `# Error\n\n> Failed to generate llms.txt: ${errorMessage}\n\n${this.buildAttributionMd()}`
    }
  }
} 