import { sampleConfig } from '../../../__fixtures__/config.js'
import {
  sampleManifest,
  sampleI18nManifest,
  sampleNotFoundRoutesManifest,
} from '../../../__fixtures__/manifest.js'
import type { IConfig, ISitemapField } from '../../../interface.js'
import { UrlSetBuilder } from '../../url-set-builder.js'
import { defaultSitemapTransformer } from '../../../utils/defaults.js'

describe('UrlSetBuilder', () => {
  test('createUrlSet: Without exclusion', async () => {
    const builder = new UrlSetBuilder(sampleConfig, sampleManifest)

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With exclusion', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        exclude: ['/', '/page-0', '/page-2'],
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With i18n exclusion', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        exclude: ['/', '/page-0', '/page-2', '/about', '/fr*'],
      },
      sampleI18nManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With wildcard exclusion', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        exclude: ['/page*'],
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With async exclusion', async () => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        exclude: async () => {
          await sleep(10)
          return ['/', '/page-0', '/page-2']
        },
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: Without trailing slash', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        trailingSlash: false,
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With trailing slash', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        trailingSlash: true,
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/',
        alternateRefs: [],
        trailingSlash: true,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0/',
        alternateRefs: [],
        trailingSlash: true,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1/',
        alternateRefs: [],
        trailingSlash: true,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2/',
        alternateRefs: [],
        trailingSlash: true,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3/',
        alternateRefs: [],
        trailingSlash: true,
      },
    ])
  })

  test('createUrlSet: With custom transform', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        trailingSlash: true,
        transform: (_, url) => {
          if (!['/', '/page-2'].includes(url)) {
            return
          }

          return {
            loc: url,
            changefreq: 'yearly',
          } as any
        },
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'yearly',
        loc: 'https://example.com/',
        alternateRefs: [],
        trailingSlash: true,
      },
      {
        changefreq: 'yearly',
        loc: 'https://example.com/page-2/',
        alternateRefs: [],
        trailingSlash: true,
      },
    ])
  })

  test('createUrlSet: With alternateRefs', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        siteUrl: 'https://example.com/',
        alternateRefs: [
          { href: 'https://en.example.com/', hreflang: 'en' },
          { href: 'https://fr.example.com/', hreflang: 'fr' },
        ],
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
        alternateRefs: [
          { href: 'https://en.example.com', hreflang: 'en' },
          { href: 'https://fr.example.com', hreflang: 'fr' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [
          { href: 'https://en.example.com/page-0', hreflang: 'en' },
          { href: 'https://fr.example.com/page-0', hreflang: 'fr' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [
          { href: 'https://en.example.com/page-1', hreflang: 'en' },
          { href: 'https://fr.example.com/page-1', hreflang: 'fr' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [
          { href: 'https://en.example.com/page-2', hreflang: 'en' },
          { href: 'https://fr.example.com/page-2', hreflang: 'fr' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [
          { href: 'https://en.example.com/page-3', hreflang: 'en' },
          { href: 'https://fr.example.com/page-3', hreflang: 'fr' },
        ],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With absolute alternateRefs', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        siteUrl: 'https://example.com/',
        alternateRefs: [
          { href: 'https://example.com/en', hreflang: 'en' },
          { href: 'https://example.com/fr', hreflang: 'fr' },
          { href: 'https://example.com/it', hreflang: 'it' },
          { href: 'https://example.com/de', hreflang: 'de' },
        ],
        transform: (config, url) => {
          const sitemapField = {
            loc: url,
            changefreq: config.changefreq,
            priority: config.priority,
            alternateRefs: config.alternateRefs,
            lastmod: new Date().toISOString(),
          } as ISitemapField
          if (url.startsWith('/page')) {
            sitemapField.alternateRefs = [
              {
                href: 'https://example.com/en',
                hreflang: 'en',
              },
              {
                href: 'https://example.com/fr',
                hreflang: 'fr',
              },
              {
                href: `https://example.com/it${url.replace(
                  '/page',
                  '/pagina'
                )}`,
                hreflang: 'it',
                hrefIsAbsolute: true,
              },
              {
                href: `https://example.com/de${url.replace('/page', '/seite')}`,
                hreflang: 'de',
                hrefIsAbsolute: true,
              },
            ]
          }
          return sitemapField
        },
      },
      sampleManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
        alternateRefs: [
          { href: 'https://example.com/en', hreflang: 'en' },
          { href: 'https://example.com/fr', hreflang: 'fr' },
          { href: 'https://example.com/it', hreflang: 'it' },
          { href: 'https://example.com/de', hreflang: 'de' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [
          { href: 'https://example.com/en/page-0', hreflang: 'en' },
          { href: 'https://example.com/fr/page-0', hreflang: 'fr' },
          { href: 'https://example.com/it/pagina-0', hreflang: 'it' },
          { href: 'https://example.com/de/seite-0', hreflang: 'de' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [
          { href: 'https://example.com/en/page-1', hreflang: 'en' },
          { href: 'https://example.com/fr/page-1', hreflang: 'fr' },
          { href: 'https://example.com/it/pagina-1', hreflang: 'it' },
          { href: 'https://example.com/de/seite-1', hreflang: 'de' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [
          { href: 'https://example.com/en/page-2', hreflang: 'en' },
          { href: 'https://example.com/fr/page-2', hreflang: 'fr' },
          { href: 'https://example.com/it/pagina-2', hreflang: 'it' },
          { href: 'https://example.com/de/seite-2', hreflang: 'de' },
        ],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [
          { href: 'https://example.com/en/page-3', hreflang: 'en' },
          { href: 'https://example.com/fr/page-3', hreflang: 'fr' },
          { href: 'https://example.com/it/pagina-3', hreflang: 'it' },
          { href: 'https://example.com/de/seite-3', hreflang: 'de' },
        ],
        trailingSlash: false,
      },
    ])
  })

  test('createUrlSet: With additionalPaths', async () => {
    const transform: IConfig['transform'] = async (config, url) => {
      if (['/', '/page-0', '/page-1'].includes(url)) {
        return
      }

      if (url === '/additional-page-3') {
        return {
          loc: url,
          changefreq: 'yearly',
          priority: 0.8,
        }
      }

      return defaultSitemapTransformer(config, url)
    }

    const mockTransform = jest.fn(transform)

    const config: IConfig = {
      ...sampleConfig,
      siteUrl: 'https://example.com/',
      transform: mockTransform,
      additionalPaths: async (config) => [
        { loc: '/page-1', priority: 1, changefreq: 'yearly' },
        { loc: '/page-3', priority: 0.9, changefreq: 'yearly' },
        { loc: '/additional-page-1' },
        { loc: '/additional-page-2', priority: 1, changefreq: 'yearly' },
        await config.transform(config, '/additional-page-3'),
      ],
    }

    const builder = new UrlSetBuilder(config, sampleManifest)

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'yearly',
        lastmod: expect.any(String),
        priority: 0.9,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'yearly',
        priority: 1,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        loc: 'https://example.com/additional-page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'yearly',
        priority: 1,
        loc: 'https://example.com/additional-page-2',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'yearly',
        priority: 0.8,
        loc: 'https://example.com/additional-page-3',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(mockTransform.mock.calls.map(([_, url]) => url)).toEqual([
      '/',
      '/page-0',
      '/page-1',
      '/page-2',
      '/page-3',
      '/additional-page-3',
    ])
  })

  test('createUrlSet: With next i18n enabled', async () => {
    const builder = new UrlSetBuilder(sampleConfig, sampleI18nManifest)

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      expect.objectContaining({
        loc: 'https://example.com',
      }),
      expect.objectContaining({
        loc: 'https://example.com/about',
      }),
      expect.objectContaining({
        loc: 'https://example.com/fr',
      }),
      expect.objectContaining({
        loc: 'https://example.com/fr/about',
      }),
      expect.objectContaining({
        loc: 'https://example.com/page-0',
      }),
      expect.objectContaining({
        loc: 'https://example.com/page-1',
      }),
      expect.objectContaining({
        loc: 'https://example.com/page-2',
      }),
      expect.objectContaining({
        loc: 'https://example.com/fr/page-2',
      }),
      expect.objectContaining({
        loc: 'https://example.com/page-3',
      }),
    ])
  })

  test('createUrlSet: With i18n, without notFound routes', async () => {
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
      },
      sampleNotFoundRoutesManifest
    )

    await expect(builder.createUrlSet()).resolves.toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/about',
        alternateRefs: [],
        trailingSlash: false,
      },
      // /about
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/nl-NL',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/fr/about',
        alternateRefs: [],
        trailingSlash: false,
      },
      // only localized page
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/nl-NL/only-nl',
        alternateRefs: [],
        trailingSlash: false,
      },
      // page-0
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
        trailingSlash: false,
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/fr/page-0',
        alternateRefs: [],
        trailingSlash: false,
      },
      // page-1
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })
})
