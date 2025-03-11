/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { IConfig, ILLMsSection } from '../interface.js'

export class LLMsTxtBuilder {
  /**
   * Generate a link entry in a section
   * @param link Link object with title, url and optional details
   * @returns Markdown formatted link
   */
  formatLink(link: { title: string; url: string; details?: string }): string {
    let linkMd = `- [${link.title}](${link.url})`
    
    if (link.details) {
      linkMd += ` - ${link.details}`
    }
    
    return linkMd
  }

  /**
   * Format a section with title and links
   * @param section Section object
   * @returns Markdown formatted section
   */
  formatSection(section: ILLMsSection): string {
    let sectionMd = `## ${section.title}`
    
    if (section.isOptional) {
      sectionMd += ' (optional)'
    }
    
    sectionMd += '\n\n'
    
    // Add all links
    section.links.forEach(link => {
      sectionMd += `${this.formatLink(link)}\n`
    })
    
    return sectionMd
  }

  /**
   * Generates llms.txt content in Markdown format following the llmstxt.org specification
   * @param config
   * @returns Markdown formatted llms.txt content
   */
  generateLLMsTxt(config: IConfig): string {
    const { title, description, details, sections } = config.llmsTxtOptions!
    
    // Start with the title (H1)
    let content = `# ${title}\n\n`
    
    // Add description as blockquote if provided
    if (description) {
      content += `> ${description}\n\n`
    }
    
    // Add additional details if provided
    if (details) {
      content += `${details}\n\n`
    }
    
    // Add sections if provided
    if (sections && sections.length > 0) {
      sections.forEach(section => {
        content += `${this.formatSection(section)}\n`
      })
    }
    
    // Add generator attribution
    content += `\n---\n\n*Generated using [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)*\n`
    
    return content
  }
} 