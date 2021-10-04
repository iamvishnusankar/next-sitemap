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
        loc: 'https://example-news.com',
        news: undefined,
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
    expect(sitemap).toMatchSnapshot()
  })
  test('snapshot test for handling the google news from final sitemap', () => {
    // Sample fields
    const fields: ISitemapField[] = [
      {
        loc: 'https://example-ny-times.com',
        lastmod: '2021-03-05T20:38:12Z',
        news: {
          publication: {
            name: 'The New York Times',
            language: 'en-US',
          },
          publication_date: '2019-09-30T08:00:03Z',
          title:
            "Lesson of the Day: 'Kehinde Wiley’s Times Square Monument: That’s No Robert E. Lee'",
        },
      },
    ]

    // Generate sitemap
    const sitemap = buildSitemapXml(fields)

    // Expect the generated sitemap to match snapshot.
    expect(sitemap).toMatchSnapshot()
  })
})
