import { buildSitemapXml } from '.'

describe('generateSitemap', () => {
  test('buildSitemapXml', () => {
    expect(
      buildSitemapXml(
        {
          siteUrl: 'https://example.com',
          priority: 0.7,
          changefreq: 'daily',
          path: 'sitemap'
        },
        ['/', '/another', '/example']
      )
    ).toMatchSnapshot()
  })
})
