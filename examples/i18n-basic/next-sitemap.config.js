/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://example.com',
      hreflang: 'en',
    },
    {
      href: 'https://example.com/de',
      hreflang: 'de',
    },
  ],
}

export default config
