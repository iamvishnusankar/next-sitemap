import { normalizeSitemapField } from '..'
import { sampleConfig } from '../../../fixtures/config'

describe('normalizeSitemapField', () => {
  test('No sitemap field trailingSlash provided => Use config.trailingSlash', async () => {
    expect(
      normalizeSitemapField(
        {
          ...sampleConfig,
          trailingSlash: false,
        },
        {
          changefreq: 'daily',
          lastmod: expect.any(String),
          priority: 0.7,
          loc: '/page-2',
          alternateRefs: [],
        }
      )
    ).toStrictEqual({
      alternateRefs: expect.any(Array),
      changefreq: 'daily',
      lastmod: expect.any(String),
      loc: 'https://example.com/page-2',
      priority: 0.7,
      trailingSlash: false,
    })
  })

  test('Sitemap field trailingSlash provided => Use field.trailingSlash', async () => {
    expect(
      normalizeSitemapField(
        {
          ...sampleConfig,
          trailingSlash: false,
        },
        {
          changefreq: 'daily',
          lastmod: expect.any(String),
          priority: 0.7,
          loc: '/page-2',
          alternateRefs: [],
          trailingSlash: true,
        }
      )
    ).toStrictEqual({
      alternateRefs: expect.any(Array),
      changefreq: 'daily',
      lastmod: expect.any(String),
      loc: 'https://example.com/page-2',
      priority: 0.7,
      trailingSlash: true,
    })
  })
})
