/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defaultConfig, withDefaultConfig, transformSitemap } from '.'
import { IConfig, ISitemapField } from '../interface'

describe('next-sitemap/config', () => {
  test('defaultConfig', () => {
    expect(defaultConfig).toStrictEqual<Partial<IConfig>>({
      sourceDir: '.next',
      outDir: 'public',
      priority: 0.7,
      changefreq: 'daily',
      sitemapSize: 5000,
      autoLastmod: true,
      exclude: [],
      trailingSlash: false,
      transform: transformSitemap,
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
      exclude: ['1', '2'],
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
      exclude: ['1', '2'],
      transform: transformSitemap,
      trailingSlash: false,
      robotsTxtOptions: {
        policies: [],
        additionalSitemaps: [
          'https://example.com/awesome-sitemap.xml',
          'https://example.com/awesome-sitemap-2.xml',
        ],
      },
    })
  })

  test('withDefaultConfig: default transformation', async () => {
    const myConfig = withDefaultConfig({
      sourceDir: 'custom-source',
      generateRobotsTxt: true,
      sitemapSize: 50000,
      exclude: ['1', '2'],
      priority: 0.6,
      changefreq: 'weekly',
      robotsTxtOptions: {
        policies: [],
        additionalSitemaps: [
          'https://example.com/awesome-sitemap.xml',
          'https://example.com/awesome-sitemap-2.xml',
        ],
      },
    })

    const value = await myConfig.transform!(myConfig, 'https://example.com')

    expect(value).toStrictEqual({
      loc: 'https://example.com',
      lastmod: expect.any(String),
      changefreq: 'weekly',
      priority: 0.6,
    })
  })

  test('withDefaultConfig: custom transformation', async () => {
    const myConfig = withDefaultConfig({
      sourceDir: 'custom-source',
      generateRobotsTxt: true,
      sitemapSize: 50000,
      exclude: ['1', '2'],
      priority: 0.6,
      changefreq: 'weekly',
      transform: async (): Promise<ISitemapField> => {
        return {
          loc: 'something-else',
          lastmod: 'lastmod-cutom',
        }
      },
      robotsTxtOptions: {
        policies: [],
        additionalSitemaps: [
          'https://example.com/awesome-sitemap.xml',
          'https://example.com/awesome-sitemap-2.xml',
        ],
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const value = await myConfig.transform!(myConfig, 'https://example.com')

    expect(value).toStrictEqual({
      loc: 'something-else',
      lastmod: 'lastmod-cutom',
    })
  })
})
