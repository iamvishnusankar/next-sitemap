import { createUrlSet } from '..'
import { transformSitemap } from '../../../config'
import { sampleConfig } from '../../../fixtures/config'
import { sampleManifest, sampleI18nManifest } from '../../../fixtures/manifest'
import { IConfig, ISitemapField } from '../../../interface'

describe('createUrlSet', () => {
  test('without exclusion', async () => {
    const urlset = await createUrlSet(sampleConfig, sampleManifest)
    expect(urlset).toStrictEqual([
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

  test('with exclusion', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        exclude: ['/', '/page-0', '/page-2'],
      },
      sampleManifest
    )

    expect(urlset).toStrictEqual([
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

  test('with i18n exclusion', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        exclude: ['/', '/page-0', '/page-2', '/about', '/fr*'],
      },
      sampleI18nManifest
    )

    expect(urlset).toStrictEqual([
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

  test('with wildcard exclusion', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        exclude: ['/page*'],
      },
      sampleManifest
    )

    expect(urlset).toStrictEqual([
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

  test('without trailing slash', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        trailingSlash: false,
      },
      sampleManifest
    )
    expect(urlset).toStrictEqual([
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

  test('with trailing slash', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        trailingSlash: true,
      },
      sampleManifest
    )
    expect(urlset).toStrictEqual([
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

  test('with mixed trailing slash', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        trailingSlash: true,
        additionalPaths: async (config) => [
          await config.transform(
            {
              ...config,
              trailingSlash: false, // Per path override
            },
            '/additional-page.html'
          ),
        ],
      },
      sampleManifest
    )
    expect(urlset).toStrictEqual([
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
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/additional-page.html',
        alternateRefs: [],
        trailingSlash: false,
      },
    ])
  })

  test('with custom transform', async () => {
    const urlset = await createUrlSet(
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

    expect(urlset).toStrictEqual([
      {
        changefreq: 'yearly',
        loc: 'https://example.com/',
        alternateRefs: [],
      },
      {
        changefreq: 'yearly',
        loc: 'https://example.com/page-2/',
        alternateRefs: [],
      },
    ])
  })

  test('with alternateRefs', async () => {
    const urlset = await createUrlSet(
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

    expect(urlset).toStrictEqual([
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

  test('with absolute alternateRefs', async () => {
    const urlset = await createUrlSet(
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

    expect(urlset).toStrictEqual([
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
      },
    ])
  })

  test('with additionalPaths', async () => {
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

      return transformSitemap(config, url)
    }

    const mockTransform = jest.fn(transform)

    const config: IConfig = {
      ...sampleConfig,
      siteUrl: 'https://example.com/',
      transform: mockTransform,
      additionalPaths: async (config) => [
        {
          loc: '/page-1',
          priority: 1,
          changefreq: 'yearly',
        },
        {
          loc: '/page-3',
          priority: 0.9,
          changefreq: 'yearly',
        },
        {
          loc: '/additional-page-1',
        },
        {
          loc: '/additional-page-2',
          priority: 1,
          changefreq: 'yearly',
        },
        await config.transform(config, '/additional-page-3'),
      ],
    }

    const urlset = await createUrlSet(config, sampleManifest)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(mockTransform.mock.calls.map(([_, url]) => url)).toEqual([
      '/',
      '/page-0',
      '/page-1',
      '/page-2',
      '/page-3',
      '/additional-page-3',
    ])

    expect(urlset).toStrictEqual([
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
      },
      {
        loc: 'https://example.com/additional-page-1',
        alternateRefs: [],
      },
      {
        changefreq: 'yearly',
        priority: 1,
        loc: 'https://example.com/additional-page-2',
        alternateRefs: [],
      },
      {
        changefreq: 'yearly',
        priority: 0.8,
        loc: 'https://example.com/additional-page-3',
        alternateRefs: [],
      },
    ])
  })

  test('with next i18n enabled', async () => {
    const urlset = await createUrlSet(sampleConfig, sampleI18nManifest)
    expect(urlset).toStrictEqual([
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
})
