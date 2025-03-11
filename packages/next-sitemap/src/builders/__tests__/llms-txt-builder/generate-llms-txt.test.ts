import { LLMsTxtBuilder } from '../../llms-txt-builder.js'
import type { IConfig } from '../../../interface.js'

// Mock config
const config: IConfig = {
  siteUrl: 'https://example.com',
  generateLLMsTxt: true,
  llmsTxtOptions: {
    title: 'Test Website',
    description: 'This is a test website for llms.txt generation',
    details: 'Some additional details about the site',
    sections: [
      {
        title: 'Documentation',
        links: [
          {
            title: 'API',
            url: 'https://example.com/api',
            details: 'API documentation'
          }
        ]
      },
      {
        title: 'Examples',
        isOptional: true,
        links: [
          {
            title: 'Basic',
            url: 'https://example.com/examples/basic'
          }
        ]
      }
    ]
  }
} as IConfig

describe('LLMsTxtBuilder', () => {
  const builder = new LLMsTxtBuilder()

  test('buildHeaderMd should create a header with title and description', () => {
    const title = 'Test Title'
    const description = 'Test description'
    const header = builder.buildHeaderMd(title, description)
    
    expect(header).toContain('# Test Title')
    expect(header).toContain('> Test description')
  })

  test('buildLinkMd should create a formatted link', () => {
    const link = {
      title: 'Test Link',
      url: 'https://example.com',
      details: 'Link details'
    }
    
    const linkMd = builder.buildLinkMd(link)
    
    expect(linkMd).toContain('- [Test Link](https://example.com)')
    expect(linkMd).toContain('- Link details')
  })

  test('buildSectionMd should create a formatted section', () => {
    const section = {
      title: 'Test Section',
      isOptional: true,
      links: [
        {
          title: 'Test Link',
          url: 'https://example.com'
        }
      ]
    }
    
    const sectionMd = builder.buildSectionMd(section)
    
    expect(sectionMd).toContain('## Test Section (optional)')
    expect(sectionMd).toContain('- [Test Link](https://example.com)')
  })

  test('generateLLMsTxt should generate the complete llms.txt content', () => {
    const content = builder.generateLLMsTxt(config)
    
    // Check that content includes the title
    expect(content).toContain('# Test Website')
    
    // Check that content includes the description (with escaped characters if any)
    expect(content).toContain('> This is a test website for llms')
    
    // Check that content includes the details
    expect(content).toContain('Some additional details about the site')
    
    // Check that content includes the Documentation section
    expect(content).toContain('## Documentation')
    expect(content).toContain('[API](https://example.com/api)')
    expect(content).toContain('API documentation')
    
    // Check that content includes the Examples section marked as optional
    expect(content).toContain('## Examples (optional)')
    expect(content).toContain('[Basic](https://example.com/examples/basic)')
    
    // Check that content includes the attribution
    expect(content).toContain('Generated using [next-sitemap]')
  })

  test('escapeHtml should properly escape special characters', () => {
    // Create a config with special characters in the title
    const specialConfig = {
      ...config,
      llmsTxtOptions: {
        ...config.llmsTxtOptions,
        title: 'Test & Website <script>alert("XSS")</script>',
        description: 'Description with < and > symbols'
      }
    } as IConfig
    
    const content = builder.generateLLMsTxt(specialConfig)
    
    // Verify special characters are escaped
    expect(content).toContain('# Test &#38; Website &#60;script&#62;alert&#40;&#34;XSS&#34;&#41;&#60;&#47;script&#62;')
    expect(content).toContain('&#60; and &#62; symbols')
  })
}) 