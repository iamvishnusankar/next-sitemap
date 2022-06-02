/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 1000,
}

export default config
