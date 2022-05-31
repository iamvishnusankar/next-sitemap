import type { ISitemapField } from '../../interface.js'
import { buildSitemapXml } from '../sitemap.js'

describe('buildSitemapXml', () => {
  test('snapshot test to exclude undefined values from final sitemap', () => {
    // Sample fields
    const fields: ISitemapField[] = [
      {
        loc: 'https://example.com',
        lastmod: undefined,
      },
      {
        loc: 'https://example.com',
        lastmod: 'some-value',
        alternateRefs: [
          {
            href: 'https://example.com/en',
            hreflang: 'en',
          },
          {
            href: 'https://example.com/fr',
            hreflang: 'fr',
          },
        ],
      },
    ]

    // Generate sitemap
    const sitemap = buildSitemapXml(fields)

    // Expect the generated sitemap to match snapshot.
    expect(sitemap).toMatchInlineSnapshot()
  })
})
