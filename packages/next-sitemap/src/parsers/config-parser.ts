import { merge } from '@corex/deepmerge'
import type {
  IConfig,
  ISitemapField,
  IRuntimePaths,
  IExportMarker,
} from '../interface.js'
import { Logger } from '../logger.js'
import { loadFile } from '../utils/file.js'
import { getConfigFilePath } from '../utils/path.js'

export class ConfigParser {
  deepMerge(...configs: Array<Partial<IConfig>>): IConfig {
    return merge(configs, {
      arrayMergeType: 'overwrite',
    }) as IConfig
  }

  withDefaultConfig(config: Partial<IConfig>): IConfig {
    const defaultConfig: Partial<IConfig> = {
      sourceDir: '.next',
      outDir: 'public',
      priority: 0.7,
      sitemapBaseFileName: 'sitemap',
      changefreq: 'daily',
      sitemapSize: 5000,
      autoLastmod: true,
      exclude: [],
      transform: this.transformSitemap,
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

    return this.deepMerge(defaultConfig, config)
  }

  transformSitemap(config: IConfig, loc: string): ISitemapField {
    return {
      loc,
      changefreq: config?.changefreq,
      priority: config?.priority,
      lastmod: config?.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
      trailingSlash: config?.trailingSlash,
    }
  }

  async getRuntimeConfig(
    runtimePaths: IRuntimePaths
  ): Promise<Partial<IConfig>> {
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

  async withRuntimeConfig(
    config: IConfig,
    runtimePaths: IRuntimePaths
  ): Promise<IConfig> {
    // Runtime configs
    const runtimeConfig = await this.getRuntimeConfig(runtimePaths)

    // Prioritize `trailingSlash` value from `next-sitemap.js`
    const trailingSlashConfig: Partial<IConfig> = {}
    if ('trailingSlash' in config) {
      trailingSlashConfig.trailingSlash = config?.trailingSlash
    }

    return this.deepMerge(config, runtimeConfig, trailingSlashConfig)
  }

  async loadBaseConfig(): Promise<IConfig> {
    // Get config file path
    const path = await getConfigFilePath()

    // Load base config
    const baseConfig = await loadFile<IConfig>(path)

    if (!baseConfig) {
      throw new Error()
    }

    return this.withDefaultConfig(baseConfig)
  }
}
