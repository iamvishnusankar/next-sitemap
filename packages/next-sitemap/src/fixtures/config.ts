import { IConfig } from '../interface'
import { withDefaultConfig } from '../config'

export const sampleConfig: IConfig = withDefaultConfig({
  siteUrl: 'https://example.com',
  sourceDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/sub-path-1', '/path-2'],
      },
      {
        userAgent: 'friendly-bot',
        allow: '/',
        crawlDelay: 10,
      },
    ],
    additionalSitemaps: [
      'https://example.com/my-custom-sitemap-1.xml',
      'https://example.com/my-custom-sitemap-2.xml',
      'https://example.com/my-custom-sitemap-3.xml',
    ],
  },
})
