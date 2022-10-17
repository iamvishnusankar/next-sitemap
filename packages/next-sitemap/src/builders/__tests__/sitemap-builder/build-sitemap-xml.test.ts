import { SitemapBuilder } from '../../sitemap-builder.js'

describe('SitemapBuilder', () => {
  test('snapshot test to exclude undefined values from final sitemap', () => {
    // Builder instance
    const builder = new SitemapBuilder()

    // Build content
    const content = builder.buildSitemapXml([
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
    ])

    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
      <urlset xmlns=\\"https://www.sitemaps.org/schemas/sitemap/0.9\\" xmlns:news=\\"https://www.google.com/schemas/sitemap-news/0.9\\" xmlns:xhtml=\\"https://www.w3.org/1999/xhtml\\" xmlns:mobile=\\"https://www.google.com/schemas/sitemap-mobile/1.0\\" xmlns:image=\\"https://www.google.com/schemas/sitemap-image/1.1\\" xmlns:video=\\"https://www.google.com/schemas/sitemap-video/1.1\\">
      <url><loc>https://example.com</loc></url>
      <url><loc>https://example.com</loc><lastmod>some-value</lastmod><xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.com/en\\"/><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.com/fr\\"/></url>
      </urlset>"
    `)
  })
})
