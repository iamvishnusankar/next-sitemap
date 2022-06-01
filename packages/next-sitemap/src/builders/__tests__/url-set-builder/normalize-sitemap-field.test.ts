import { sampleConfig } from '../../../__fixtures__/config.js'
import { sampleManifest } from '../../../__fixtures__/manifest.js'
import { UrlSetBuilder } from '../../url-set-builder.js'

describe('UrlSetBuilder', () => {
  test('normalizeSitemapField: No sitemap field trailingSlash provided => Use config.trailingSlash', async () => {
    // Create builder instance
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        trailingSlash: false,
      },
      sampleManifest
    )

    // Normalize field
    const normalizedField = builder.normalizeSitemapField({
      changefreq: 'daily',
      lastmod: expect.any(String),
      priority: 0.7,
      loc: '/page-2',
      alternateRefs: [],
    })

    expect(normalizedField).toStrictEqual({
      alternateRefs: expect.any(Array),
      changefreq: 'daily',
      lastmod: expect.any(String),
      loc: 'https://example.com/page-2',
      priority: 0.7,
      trailingSlash: false,
    })
  })

  test('normalizeSitemapField: Sitemap field trailingSlash provided => Use field.trailingSlash', async () => {
    // Create builder instance
    const builder = new UrlSetBuilder(
      {
        ...sampleConfig,
        trailingSlash: false,
      },
      sampleManifest
    )

    // Normalize field
    const normalizedField = builder.normalizeSitemapField({
      changefreq: 'daily',
      lastmod: expect.any(String),
      priority: 0.7,
      loc: '/page-2',
      alternateRefs: [],
      trailingSlash: true,
    })

    expect(normalizedField).toStrictEqual({
      alternateRefs: expect.any(Array),
      changefreq: 'daily',
      lastmod: expect.any(String),
      loc: 'https://example.com/page-2/',
      priority: 0.7,
      trailingSlash: true,
    })
  })
})
