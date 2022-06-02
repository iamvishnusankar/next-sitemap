import { sampleConfig } from '../../../__fixtures__/config.js'
import { RobotsTxtBuilder } from '../../robots-txt-builder.js'

let builder: RobotsTxtBuilder

beforeEach(() => {
  builder = new RobotsTxtBuilder()
})

describe('RobotsTxtBuilder', () => {
  test('generateRobotsTxt: additionalSitemap', () => {
    expect(builder.generateRobotsTxt(sampleConfig as any))
      .toMatchInlineSnapshot(`
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
