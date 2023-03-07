/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/my-custom-sitemap-1.xml',
      'https://example.com/my-custom-sitemap-2.xml',
      'https://example.com/my-custom-sitemap-3.xml',
    ],
  },
  alternateRefs: [
    {
      href: 'https://es.example.com',
      hreflang: 'es',
    },
    {
      href: 'https://fr.example.com',
      hreflang: 'fr',
    },
  ],
}

export default config
