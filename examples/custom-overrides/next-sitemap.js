/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  additionalPaths: async (config) => [
    await config.transform(
      {
        ...config,
        trailingSlash: false,
      },
      '/additional-page.html'
    ),
  ],
}
