import { createUrlSet } from '..'
import { sampleConfig } from '../../../fixtures/config'
import { sampleManifest } from '../../../fixtures/manifest'

describe('createUrlSet', () => {
  test('without exclusion', () => {
    const urlset = createUrlSet(sampleConfig, sampleManifest)
    expect(urlset).toStrictEqual([
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
      },
    ])
  })

  test('with exclusion', () => {
    const urlset = createUrlSet(
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
      },
    ])
  })

  test('with wildcard exclusion', () => {
    const urlset = createUrlSet(
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
      },
    ])
  })

  test('without trailing slash', () => {
    const urlset = createUrlSet(
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3',
      },
    ])
  })

  test('with trailing slash', () => {
    const urlset = createUrlSet(
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
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-0/',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-1/',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-2/',
      },
      {
        changefreq: 'daily',
        lastmod: expect.any(String),
        priority: 0.7,
        loc: 'https://example.com/page-3/',
      },
    ])
  })

  test('with custom transform', () => {
    const urlset = createUrlSet(
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
      },
      {
        changefreq: 'yearly',
        loc: 'https://example.com/page-2/',
      },
    ])
  })
})
