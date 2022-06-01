import { merge } from '@corex/deepmerge'
import type {
  IConfig,
  ISitemapField,
  IRuntimePaths,
  IExportMarker,
  INextManifest,
  IBuildManifest,
  IPreRenderManifest,
  IRoutesManifest,
} from './interface.js'
import { Logger } from './logger'
import { loadFile } from './utils/file'
import { getConfigFilePath, getRuntimePaths } from './utils/path.js'

export class Loader {
  config: IConfig

  runtimePaths: IRuntimePaths

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

  async withRuntimeConfig(config: IConfig): Promise<IConfig> {
    // Runtime configs
    const runtimeConfig = await this.getRuntimeConfig(this.runtimePaths)

    // Prioritize `trailingSlash` value from `next-sitemap.js`
    const trailingSlashConfig: Partial<IConfig> = {}
    if ('trailingSlash' in config) {
      trailingSlashConfig.trailingSlash = config?.trailingSlash
    }

    return this.deepMerge(config, runtimeConfig, trailingSlashConfig)
  }

  async getBaseConfig(path: string): Promise<IConfig> {
    // Load base config
    const baseConfig = await loadFile<IConfig>(path)

    if (!baseConfig) {
      throw new Error()
    }

    return this.withDefaultConfig(baseConfig)
  }

  async loadConfig() {
    // Get config file path
    const configFilePath = await getConfigFilePath()

    // Load next-sitemap.js
    const tempConfig = await this.getBaseConfig(configFilePath)

    // Init runtime paths
    this.runtimePaths = getRuntimePaths(tempConfig)

    // Update current config with runtime config
    return this.withRuntimeConfig(tempConfig)
  }

  async loadManifest(): Promise<INextManifest> {
    // Get runtime path vars
    const { BUILD_MANIFEST, PRERENDER_MANIFEST, ROUTES_MANIFEST } =
      this.runtimePaths

    // Load build manifest
    const buildManifest = await loadFile<IBuildManifest>(BUILD_MANIFEST)

    // Throw error if no build manifest exist
    if (!buildManifest) {
      throw new Error(
        'Unable to find build manifest, make sure to build your next project before running next-sitemap command'
      )
    }

    // Load pre-render manifest
    const preRenderManifest = await loadFile<IPreRenderManifest>(
      PRERENDER_MANIFEST,
      false
    )

    // Load routes manifest
    const routesManifest = await loadFile<IRoutesManifest>(
      ROUTES_MANIFEST,
      false
    )

    return {
      build: buildManifest,
      preRender: preRenderManifest,
      routes: routesManifest,
    }
  }

  /**
   * Initializes the loader instance
   */
  async initialize() {
    // Load config
    this.config = await this.loadConfig()

    // Load manifest
    await this.loadManifest()
  }
}
