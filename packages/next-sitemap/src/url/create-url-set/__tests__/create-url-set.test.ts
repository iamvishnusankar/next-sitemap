import { createUrlSet } from '..'
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0/',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1/',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2/',
        alternateRefs: [],
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3/',
        alternateRefs: [],
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
      },
    ])
  })
})
