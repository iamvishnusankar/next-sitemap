import { generateRobotsTxt } from '../generate.js'
import { sampleConfig } from '../../__fixtures__/config.js'

describe('next-sitemap/generateRobotsTxt', () => {
  test('generateRobotsTxt: generateRobotsTxt false in config', () => {
    expect(
      generateRobotsTxt({
        ...sampleConfig,
        generateRobotsTxt: false,
      } as any)
    ).toBeNull()
  })

  test('generateRobotsTxt: additionalSitemap', () => {
    expect(generateRobotsTxt(sampleConfig as any)).toMatchInlineSnapshot(`
      "# *
      User-agent: *
      Allow: /

      # black-listed-bot
      User-agent: black-listed-bot
      Disallow: /sub-path-1
      Disallow: /path-2

      # friendly-bot
      User-agent: friendly-bot
      Allow: /
      Crawl-delay: 10

      # Host
      Host: https://example.com

      # Sitemaps
      Sitemap: https://example.com/my-custom-sitemap-1.xml
      Sitemap: https://example.com/my-custom-sitemap-2.xml
      Sitemap: https://example.com/my-custom-sitemap-3.xml
      "
    `)
  })
})
