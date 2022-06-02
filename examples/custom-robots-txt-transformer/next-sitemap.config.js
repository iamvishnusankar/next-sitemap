/** @type {import('next-sitemap').IConfig} */
import { asciiArt } from './art.js'

const config = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 1000,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) => `${robotsTxt}\n\n${asciiArt}`,
  },
}

export default config
