import { defaultConfig } from '.'

describe('next-sitemap/config', () => {
  test('defaultConfig', () => {
    expect(defaultConfig).toStrictEqual({
      rootDir: 'public',
      priority: 0.7,
      changefreq: 'daily',
      sitemapSize: 5000,
      robotsTxtOptions: {
        policies: [
          {
            userAgent: '*',
            allow: '/'
          }
        ],
        additionalSitemaps: []
      }
    })
  })
})
