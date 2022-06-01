import { IConfig, ISitemapField } from '../interface.js'

export const defaultSitemapTransformer = (
  config: IConfig,
  loc: string
): ISitemapField => {
  return {
    loc,
    changefreq: config?.changefreq,
    priority: config?.priority,
    lastmod: config?.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: config.alternateRefs ?? [],
    trailingSlash: config?.trailingSlash,
  }
}

export const defaultConfig: Partial<IConfig> = {
  sourceDir: '.next',
  outDir: 'public',
  priority: 0.7,
  sitemapBaseFileName: 'sitemap',
  changefreq: 'daily',
  sitemapSize: 5000,
  autoLastmod: true,
  exclude: [],
  transform: defaultSitemapTransformer,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
}
