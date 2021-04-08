import { ISitemapFiled } from '../../interface'
import { buildSitemapXml } from '../buildSitemapXml'

describe('buildSitemapXml', () => {
  test('snapshot test to exclude undefined values from final sitemap', () => {
    // Sample fields
    const fields: ISitemapFiled[] = [
      {
        loc: 'https://example.com',
        lastmod: undefined,
        'xhtml:link': [null, {
          href: 'https://example.com/fr',
          rel: 'alternate',
          hreflang: 'fr'
        }],
        news: {
          article: {
            title: ['Hi !', {
              link: 'https://facebook.fr'
            }]
          }
        }
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
