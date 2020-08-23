import { defaultConfig, withDefaultConfig } from '.'
import { IConfig } from '../interface'

describe('next-sitemap/config', () => {
  test('defaultConfig', () => {
    expect(defaultConfig).toStrictEqual<Partial<IConfig>>({
      sourceDir: '.next',
      outDir: 'public',
      priority: 0.7,
      changefreq: 'daily',
      sitemapSize: 5000,
      autoLastmod: true,
      robotsTxtOptions: {
        policies: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
        additionalSitemaps: [],
      },
    })
  })

  test('withDefaultConfig', () => {
    const myConfig = withDefaultConfig({
      sourceDir: 'custom-source',
      generateRobotsTxt: true,
      sitemapSize: 50000,
      robotsTxtOptions: {
        policies: [],
        additionalSitemaps: [
          'https://example.com/awesome-sitemap.xml',
          'https://example.com/awesome-sitemap-2.xml',
        ],
      },
    })

    expect(myConfig).toStrictEqual<Partial<IConfig>>({
      sourceDir: 'custom-source',
      outDir: 'public',
      priority: 0.7,
      changefreq: 'daily',
      sitemapSize: 50000,
      autoLastmod: true,
      generateRobotsTxt: true,
      robotsTxtOptions: {
        policies: [],
        additionalSitemaps: [
          'https://example.com/awesome-sitemap.xml',
          'https://example.com/awesome-sitemap-2.xml',
        ],
      },
    })
  })
})
