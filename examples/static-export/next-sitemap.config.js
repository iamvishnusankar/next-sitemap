/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  output: 'static', // Set static output here
}

module.exports = config
