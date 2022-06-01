import { merge } from '@corex/deepmerge'
import { Logger } from '../logger.js'
import { defaultConfig } from '../utils/defaults.js'
import { loadFile } from '../utils/file.js'
import { getConfigFilePath } from '../utils/path.js'
import type { IConfig, IRuntimePaths, IExportMarker } from '../interface.js'

export class ConfigParser {
  deepMerge(...configs: Array<Partial<IConfig>>): IConfig {
    return merge(configs, {
      arrayMergeType: 'overwrite',
    }) as IConfig
  }

  withDefaultConfig(config: Partial<IConfig>): IConfig {
    return this.deepMerge(defaultConfig, config)
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
