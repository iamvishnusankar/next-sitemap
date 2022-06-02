import { Logger } from '../logger.js'
import { withDefaultConfig } from '../utils/defaults.js'
import { getConfigFilePath } from '../utils/path.js'
import type { IConfig, IRuntimePaths, IExportMarker } from '../interface.js'
import { overwriteMerge } from '../utils/merge.js'
import { loadJSON } from '../utils/file.js'

export class ConfigParser {
  /**
   * Get runtime config
   * @param runtimePaths
   * @returns
   */
  async getRuntimeConfig(
    runtimePaths: IRuntimePaths
  ): Promise<Partial<IConfig>> {
    const exportMarkerConfig = await loadJSON<IExportMarker>(
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

  /**
   * Update existing config with runtime config
   * @param config
   * @param runtimePaths
   * @returns
   */
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

    return overwriteMerge(config, runtimeConfig, trailingSlashConfig)
  }

  /**
   * Load next-sitemap.config.js as module
   * @returns
   */
  async loadBaseConfig(): Promise<IConfig> {
    // Get config file path
    const path = await getConfigFilePath()

    // Config loading message
    Logger.log('✨', `Loading next-sitemap config:`, path)

    // Load base config
    const baseConfig = await import(path)

    if (!baseConfig.default) {
      throw new Error('Unable to next-sitemap config file')
    }

    return withDefaultConfig(baseConfig.default)
  }
}
