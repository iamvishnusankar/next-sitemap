module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  // Optional custom transformation function
  transform: (_, url) => {
    return {
      url,
      changefreq: 'yearly',
      custom: 'prop',
    }
  },
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/my-custom-sitemap-1.xml',
      'https://example.com/my-custom-sitemap-2.xml',
      'https://example.com/my-custom-sitemap-3.xml',
    ],
  },
}
