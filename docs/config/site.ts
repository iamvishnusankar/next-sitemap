import { SiteConfig, SiteExampleConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'next-sitemap',
  description: 'Sitemap Generator For Next.Js Application',
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    'https://next-sitemap.iamvishnusankar.com/',
  links: {
    twitter: 'https://twitter.com/iamvishnusankar',
    github: 'https://github.com/iamvishnusankar/next-sitemap',
  },
}

export const siteExampleConfig: SiteExampleConfig = {
  name: 'next-sitemap - Examples',
  description: 'Examples where next-sitemap has been utilized.',
  url: 'https://next-sitemap.iamvishnusankar.com/examples',
  ogImage: 'https://next-sitemap.iamvishnusankar.com/examples.jpg',
  links: {
    twitter: 'https://twitter.com/iamvishnusankar',
    github: 'https://github.com/iamvishnusankar/next-sitemap',
  },
}
