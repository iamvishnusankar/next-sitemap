import { createUrlSet } from '..'
import { transformSitemap } from '../../../config'
import { sampleConfig } from '../../../fixtures/config'
import { sampleManifest } from '../../../fixtures/manifest'
import { IConfig } from '../../../interface'

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
        { loc: '/page-1', priority: 1, changefreq: 'yearly' },
        { loc: '/page-3', priority: 0.9, changefreq: 'yearly' },
        { loc: '/additional-page-1' },
        { loc: '/additional-page-2', priority: 1, changefreq: 'yearly' },
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
      },
      {
        changefreq: 'yearly',
        lastmod: expect.any(String),
        priority: 0.9,
        loc: 'https://example.com/page-3',
        alternateRefs: [],
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
})
