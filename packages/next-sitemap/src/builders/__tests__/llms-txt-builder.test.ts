import { LLMsTxtBuilder } from '../llms-txt-builder'
import type { IConfig } from '../../interface'

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

  test('generateLLMsTxt', () => {
    const content = builder.generateLLMsTxt(config)
    
    // Check that content includes the title
    expect(content).toContain('# Test Website')
    
    // Check that content includes the description
    expect(content).toContain('> This is a test website for llms.txt generation')
    
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
}) 