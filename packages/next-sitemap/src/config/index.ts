/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  IConfig,
  ISitemapField,
  IRuntimePaths,
  IExportMarker,
} from '../interface'
import { merge } from '@corex/deepmerge'
import { loadFile } from '../file'
import { Logger } from '../logger'

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
  trailingSlash: false,
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

export const updateConfig = (
  currConfig: Partial<IConfig>,
  newConfig: Partial<IConfig>
): IConfig => {
  return merge([currConfig, newConfig], {
    arrayMergeType: 'overwrite',
  }) as IConfig
}

export const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  return updateConfig(defaultConfig, config)
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
    trailingSlash: exportMarkerConfig
      ? exportMarkerConfig.exportTrailingSlash
      : undefined,
  }
}
