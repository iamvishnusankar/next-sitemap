/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import type {
  IConfig,
  ISitemapField,
  IRuntimePaths,
  IExportMarker,
} from './interface.js'
import { merge } from '@corex/deepmerge'
import { Logger } from './logger.js'
import { loadFile } from './utils/file.js'

export const loadConfig = async (path: string): Promise<IConfig> => {
  const baseConfig = await loadFile<IConfig>(path)
  return withDefaultConfig(baseConfig!)
}

export const transformSitemap = async (
  config: IConfig,
  url: string
): Promise<ISitemapField> => {
  return {
    loc: url,
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
  transform: transformSitemap,
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

export const mergeConfig = (...configs: Array<Partial<IConfig>>): IConfig => {
  return merge(configs, {
    arrayMergeType: 'overwrite',
  }) as IConfig
}

export const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  return mergeConfig(defaultConfig, config)
}

export const getRuntimeConfig = async (
  runtimePaths: IRuntimePaths
): Promise<Partial<IConfig>> => {
  const exportMarkerConfig = await loadFile<IExportMarker>(
    runtimePaths.EXPORT_MARKER,
    false
  ).catch((err) => {
    Logger.noExportMarker()
    throw err
  })

  return {
    trailingSlash: exportMarkerConfig?.exportTrailingSlash,
  }
}

export const updateWithRuntimeConfig = async (
  config: IConfig,
  runtimePaths: IRuntimePaths
): Promise<IConfig> => {
  // Runtime configs
  const runtimeConfig = await getRuntimeConfig(runtimePaths)

  // Prioritize `trailingSlash` value from `next-sitemap.js`
  const trailingSlashConfig =
    'trailingSlash' in config
      ? {
          trailingSlash: config?.trailingSlash,
        }
      : {}

  return mergeConfig(config, runtimeConfig, trailingSlashConfig)
}
