import { generateRobotsTxt } from './index'

const sampleConfig = {
  siteUrl: 'https://example.com',
  rootDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/sub-path-1', '/path-2'],
      },
    ],
    additionalSitemaps: [
      'https://example.com/my-custom-sitemap-1.xml',
      'https://example.com/my-custom-sitemap-2.xml',
      'https://example.com/my-custom-sitemap-3.xml',
    ],
  },
}

describe('next-sitemap/generateRobotsTxt', () => {
  test('generateRobotsTxt: generateRobotsTxt false in config', () => {
    expect(
      generateRobotsTxt({
        ...sampleConfig,
        generateRobotsTxt: false,
      } as any)
    ).toBeNull()
  })

  test('generateRobotsTxt: additionalSitemap', () => {
    expect(generateRobotsTxt(sampleConfig)).toMatchSnapshot()
  })
})
