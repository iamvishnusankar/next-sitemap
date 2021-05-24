import { ISitemapField } from '../../interface'
import { buildSitemapXml } from '../buildSitemapXml'

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
      },
    ]

    // Generate sitemap
    const sitemap = buildSitemapXml(fields)

    // Expect the generated sitemap to match snapshot.
    expect(sitemap).toMatchSnapshot()
  })
})
