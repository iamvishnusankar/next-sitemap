import { IConfig, ISitemapField } from '../interface.js'
import { overwriteMerge } from './merge.js'

export const defaultSitemapTransformer = async (
  config: IConfig,
  loc: string,
): Promise<ISitemapField> => {
  return {
    loc,
    lastmod: config?.autoLastmod ? new Date().toISOString() : undefined,
    changefreq: config?.changefreq,
    priority: config?.priority,
    alternateRefs: config.alternateRefs ?? [],
    trailingSlash: config?.trailingSlash,
  }
}

export const defaultRobotsTxtTransformer = async (_: IConfig, text: string) =>
  text

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
    transformRobotsTxt: defaultRobotsTxtTransformer,
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
    additionalSitemapsIndex: [],
  },
}

/**
 * Set a preset for static export mode
 * @param config
 * @returns
 */
export const getStaticExportConfigPreset = (
  config: Partial<IConfig>,
): Partial<IConfig> => {
  // Return empty preset for non static export
  if (config?.output !== 'export') {
    return {}
  }

  return {
    sourceDir: 'out',
    outDir: 'out',
  }
}

/**
 * Get default config
 * @param config
 * @returns
 */
export const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  // Add output.export config
  const staticExportConfig = getStaticExportConfigPreset(config)

  return overwriteMerge(defaultConfig, staticExportConfig, config)
}
