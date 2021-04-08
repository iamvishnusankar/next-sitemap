/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  IConfig,
  ISitemapFiled,
  IRuntimePaths,
  IExportMarker,
} from '../interface'
import { merge } from '@corex/deepmerge'
import { loadFile } from '../file'
import {formatSitemapWithPrettier} from "../sitemap/formatSitemap";

export const loadConfig = (path: string): IConfig => {
  const baseConfig = loadFile<IConfig>(path)
  return withDefaultConfig(baseConfig!)
}

export const transformSitemap = async (
  config: IConfig,
  url: string
): Promise<ISitemapFiled> => {
  return {
    loc: url,
    changefreq: config?.changefreq,
    priority: config?.priority,
    lastmod: config?.autoLastmod ? new Date().toISOString() : undefined,
  }
}

export const defaultConfig: Partial<IConfig> = {
  sourceDir: '.next',
  outDir: 'public',
  priority: 0.7,
  changefreq: 'daily',
  sitemapSize: 5000,
  autoLastmod: true,
  trailingSlash: false,
  exclude: [],
  transform: transformSitemap,
  format: formatSitemapWithPrettier,
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

export const getRuntimeConfig = (
  runtimePaths: IRuntimePaths
): Partial<IConfig> => {
  const exportMarkerConfig = loadFile<IExportMarker>(
    runtimePaths.EXPORT_MARKER,
    false
  )

  return {
    trailingSlash: exportMarkerConfig
      ? exportMarkerConfig.exportTrailingSlash
      : undefined,
  }
}
