import { buildSitemapXml } from './index'

describe('generateSitemap', () => {
  test('buildSitemapXml', () => {
    expect(
      buildSitemapXml(
        {
          siteUrl: 'https://example.com',
          priority: 0.7,
          changefreq: 'daily',
          rootDir: 'public',
        } as any,
        ['/', '/another', '/example']
      )
    ).toMatchSnapshot()
  })
})
