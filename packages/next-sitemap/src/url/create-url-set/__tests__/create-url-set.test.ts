import { createUrlSet } from '..'
import { transformSitemap } from '../../../config'
import { sampleConfig } from '../../../fixtures/config'
import { sampleManifest } from '../../../fixtures/manifest'

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
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        alternateUrls: [],
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
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        alternateUrls: [],
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
        alternateUrls: [],
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
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        alternateUrls: [],
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
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0/',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1/',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2/',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3/',
        alternateRefs: [],
        alternateUrls: [],
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
        alternateUrls: [],
      },
      {
        changefreq: 'yearly',
        loc: 'https://example.com/page-2/',
        alternateRefs: [],
        alternateUrls: [],
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
        alternateUrls: [],
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
        alternateUrls: [],
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
        alternateUrls: [],
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
        alternateUrls: [],
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
        alternateUrls: [],
      },
    ])
  })

  test('with alternateUrls', async () => {
    const urlset = await createUrlSet(
      {
        ...sampleConfig,
        siteUrl: 'https://example.com',
        transform: async (config, url) => {
          if (url.endsWith('page-0')) {
            return {
              ...(await transformSitemap(config, url)),
              alternateUrls: [
                { href: 'https://example.com/hola', hreflang: 'es' },
                { href: 'https://example.com/bonjour', hreflang: 'fr' },
              ],
            }
          }
          return transformSitemap(config, url)
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
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
        alternateUrls: [
          { href: 'https://example.com/hola', hreflang: 'es' },
          { href: 'https://example.com/bonjour', hreflang: 'fr' },
        ],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
        alternateUrls: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
        alternateUrls: [],
      },
    ])
  })
})
