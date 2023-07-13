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
      "<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
      <url><loc>https://example.com</loc></url>
      <url><loc>https://example.com</loc><lastmod>some-value</lastmod><xhtml:link rel="alternate" hreflang="en" href="https://example.com/en"/><xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr"/></url>
      </urlset>"
    `)
  })
  test('snapshot test for google news sitemap', () => {
    // Builder instance
    const builder = new SitemapBuilder()

    // Build content
    const content = builder.buildSitemapXml([
      {
        loc: 'https://example.com',
        news: {
          title: 'Companies A, B in Merger Talks',
          date: new Date('2008-01-02T00:00:00.000+01:00'),
          publicationLanguage: 'en',
          publicationName: 'The Example Times',
        },
      },
    ])

    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
      <url><loc>https://example.com</loc><news:news><news:publication><news:name>The Example Times</news:name><news:language>en</news:language></news:publication><news:publication_date>2008-01-01T23:00:00.000+00:00</news:publication_date><news:title>Companies A&#44; B in Merger Talks</news:title></news:news></url>
      </urlset>"
    `)
  })
  test('snapshot test for image sitemap', () => {
    // Builder instance
    const builder = new SitemapBuilder()

    // Build content
    const content = builder.buildSitemapXml([
      {
        loc: 'https://example.com',
        images: [
          {
            loc: new URL('https://example.com'),
          },
          {
            caption: 'Image caption & description',
            geoLocation: 'Prague, Czech Republic',
            license: new URL('https://example.com'),
            loc: new URL('https://example.com'),
            title: 'Image title',
          },
        ],
      },
    ])

    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
      <url><loc>https://example.com</loc><image:image><image:loc>https://example.com/</image:loc></image:image><image:image><image:loc>https://example.com/</image:loc><image:caption>Image caption &#38; description</image:caption><image:title>Image title</image:title><image:geo_location>Prague&#44; Czech Republic</image:geo_location><image:license>https://example.com/</image:license></image:image></url>
      </urlset>"
    `)
  })
  test('snapshot test for video sitemap', () => {
    // Builder instance
    const builder = new SitemapBuilder()

    // Build content
    const content = builder.buildSitemapXml([
      {
        loc: 'https://example.com',
        videos: [
          {
            title: 'Video title',
            contentLoc: new URL('https://example.com'),
            description: 'Video description',
            thumbnailLoc: new URL('https://example.com'),
          },
          {
            title: 'Grilling steaks for summer',
            contentLoc: new URL('https://example.com'),
            description:
              'Alkis shows you how to get perfectly done steaks every time',
            thumbnailLoc: new URL('https://example.com'),
            duration: 600,
            expirationDate: new Date('2030-03-02T00:00:00.000+01:00'),
            familyFriendly: true,
            live: false,
            platform: {
              relationship: 'allow',
              content: 'web',
            },
            playerLoc: new URL('https://example.com'),
            publicationDate: new Date('2020-04-20T00:00:00.000+02:00'),
            rating: 1,
            requiresSubscription: false,
            restriction: {
              relationship: 'deny',
              content: 'CZ',
            },
            tag: 'video',
            uploader: {
              name: 'John Doe',
              info: new URL('https://example.com'),
            },
            viewCount: 1234,
          },
        ],
      },
    ])

    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
      <url><loc>https://example.com</loc><video:video><video:title>Video title</video:title><video:thumbnail_loc>https://example.com/</video:thumbnail_loc><video:description>Video description</video:description><video:content_loc>https://example.com/</video:content_loc></video:video><video:video><video:title>Grilling steaks for summer</video:title><video:thumbnail_loc>https://example.com/</video:thumbnail_loc><video:description>Alkis shows you how to get perfectly done steaks every time</video:description><video:content_loc>https://example.com/</video:content_loc><video:player_loc>https://example.com/</video:player_loc><video:duration>600</video:duration><video:view_count>1234</video:view_count><video:tag>video</video:tag><video:rating>1.0</video:rating><video:expiration_date>2030-03-01T23:00:00.000+00:00</video:expiration_date><video:publication_date>2020-04-19T22:00:00.000+00:00</video:publication_date><video:family_friendly>yes</video:family_friendly><video:requires_subscription>no</video:requires_subscription><video:live>no</video:live><video:restriction relationship="deny">CZ</video:restriction><video:platform relationship="allow">web</video:platform><video:uploader info="https://example.com/">John Doe</video:uploader></video:video></url>
      </urlset>"
    `)
  })
})
