import { SitemapBuilder } from '../../sitemap-builder.js'
import { XMLValidator } from 'fast-xml-parser'

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
    const isValid = XMLValidator.validate(content)
    expect(isValid).toBe(true)
    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchSnapshot()
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
    const isValid = XMLValidator.validate(content)
    expect(isValid).toBe(true)
    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchSnapshot()
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
    const isValid = XMLValidator.validate(content)
    expect(isValid).toBe(true)
    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchSnapshot()
  })

  test('image sitemap generates correctly encoded results', () => {
    // Builder instance
    const builder = new SitemapBuilder()

    // Build content
    const content = builder.buildSitemapXml([
      {
        loc: 'https://example.com',
        images: [
          {
            loc: new URL('https://example.com?ref=test&test=1'),
          },
        ],
      },
    ])

    // Expect the generated sitemap to match snapshot.
    const isValid = XMLValidator.validate(content)
    expect(isValid).toBe(true)
    expect(content).toMatchSnapshot()
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
    const isValid = XMLValidator.validate(content)
    expect(isValid).toBe(true)
    // Expect the generated sitemap to match snapshot.
    expect(content).toMatchSnapshot()
  })
})
