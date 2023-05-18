/* eslint-disable @typescript-eslint/no-var-requires */
const nextConfig = require('./next.config')

/** @type {import('next-sitemap').IConfig} */
const config = {
  ...nextConfig,
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
}

module.exports = config
