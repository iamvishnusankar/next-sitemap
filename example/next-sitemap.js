module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  transform: () => {
    return null
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
