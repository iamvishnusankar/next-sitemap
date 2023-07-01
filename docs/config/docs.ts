import { DocsConfig } from '@/types'

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Examples',
      href: '/examples',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
        },
      ],
    },
    {
      title: 'Documentation',
      items: [
        {
          title: 'Installation',
          href: '/docs/documentation/installation',
        },
        {
          title: 'Index Sitemap (Optional)',
          href: '/docs/documentation/index-sitemap',
        },
        {
          title: 'Configuration Options',
          href: '/docs/documentation/configuration',
        },
        {
          title: 'Custom transformation function',
          href: '/docs/documentation/custom-transformation',
        },
        {
          title: ' Additional Paths Function',
          href: '/docs/documentation/additional-path',
        },
        {
          title: 'Google News, image and video sitemap',
          href: '/docs/documentation/google-sitemap',
        },
      ],
    },
    {
      title: 'Use Cases',
      items: [
        {
          title: 'Full Configuration Example',
          href: '/docs/documentation/full-example',
        },
        {
          title: 'Generating dynamic/server-site sitemaps',
          href: '/docs/documentation/dynamic-sitemaps',
        },
        {
          title: 'Server side index-sitemaps',
          href: '/docs/documentation/getServerSideSitemapIndex',
        },
        {
          title: 'Server side sitemap',
          href: '/docs/documentation/getServerSideSitemap',
        },
        {
          title: 'Typescript JSDoc',
          href: '/docs/documentation/typescriptjsdoc',
        },
      ],
    },
  ],
}
