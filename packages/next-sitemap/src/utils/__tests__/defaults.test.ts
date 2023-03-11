/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { IConfig, ISitemapField } from '../../interface.js'
import {
  defaultConfig,
  defaultRobotsTxtTransformer,
  defaultSitemapTransformer,
  withDefaultConfig,
} from '../defaults.js'

describe('next-sitemap/defaults', () => {
  test('defaultConfig', () => {
    expect(defaultConfig).toStrictEqual<Partial<IConfig>>({
      sourceDir: '.next',
      outDir: 'public',
      sitemapBaseFileName: 'sitemap',
      generateIndexSitemap: true,
      sitemapIndexLastmod: true,
      priority: 0.7,
      changefreq: 'daily',
      sitemapSize: 5000,
      autoLastmod: true,
      exclude: [],
      transform: defaultSitemapTransformer,
      robotsTxtOptions: {
        transformRobotsTxt: defaultRobotsTxtTransformer,
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
      generateIndexSitemap: true,
      sitemapIndexLastmod: true,
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
      sitemapBaseFileName: 'sitemap',
      generateIndexSitemap: true,
      sitemapIndexLastmod: true,
      priority: 0.7,
      changefreq: 'daily',
      sitemapSize: 50000,
      autoLastmod: true,
      generateRobotsTxt: true,
      exclude: ['1', '2'],
      transform: defaultSitemapTransformer,
      robotsTxtOptions: {
        transformRobotsTxt: defaultRobotsTxtTransformer,
        policies: [],
        additionalSitemaps: [
          'https://example.com/awesome-sitemap.xml',
          'https://example.com/awesome-sitemap-2.xml',
        ],
      },
    })
  })

  test('withDefaultConfig: Default transformation', async () => {
    const myConfig = withDefaultConfig({
      trailingSlash: false,
      sourceDir: 'custom-source',
      generateRobotsTxt: true,
      generateIndexSitemap: true,
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

    // Default transform
    await expect(
      myConfig.transform!(myConfig, 'https://example.com')
    ).resolves.toStrictEqual({
      loc: 'https://example.com',
      lastmod: expect.any(String),
      changefreq: 'weekly',
      priority: 0.6,
      alternateRefs: [],
      trailingSlash: myConfig.trailingSlash,
    })

    // Default transform with custom config override
    await expect(
      myConfig.transform!(
        {
          ...myConfig,
          trailingSlash: true,
        },
        'https://example.com'
      )
    ).resolves.toStrictEqual({
      loc: 'https://example.com',
      lastmod: expect.any(String),
      changefreq: 'weekly',
      priority: 0.6,
      alternateRefs: [],
      trailingSlash: true,
    })
  })

  test('withDefaultConfig: Custom transformation', async () => {
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
        transformRobotsTxt: defaultRobotsTxtTransformer,
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
