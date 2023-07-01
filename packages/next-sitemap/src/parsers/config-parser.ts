import { Logger } from '../logger.js'
import { withDefaultConfig } from '../utils/defaults.js'
import { getConfigFilePath, getRuntimePaths } from '../utils/path.js'
import type { IConfig, IRuntimePaths, IExportMarker } from '../interface.js'
import { overwriteMerge } from '../utils/merge.js'
import { loadJSON } from '../utils/file.js'

export class ConfigParser {
  /**
   * Get runtime config
   * @param runtimePaths
   * @returns
   */
  private async getRuntimeConfig(
    config: IConfig,
    runtimePaths: IRuntimePaths
  ): Promise<Partial<IConfig>> {
    // Skip export marker loading if output is set to "export"
    if (config?.output === 'export') {
      return {}
    }

    // Load export marker
    const exportMarkerConfig = await loadJSON<IExportMarker>(
      runtimePaths.EXPORT_MARKER
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
  private async withRuntimeConfig(
    config: IConfig,
    runtimePaths: IRuntimePaths
  ): Promise<IConfig> {
    // Runtime configs
    const runtimeConfig = await this.getRuntimeConfig(config, runtimePaths)

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
  private async loadBaseConfig(): Promise<IConfig> {
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

  /**
   * Basic validation
   * @param config
   */
  async validateConfig(config: IConfig) {
    if (!config?.siteUrl) {
      throw new Error('Validation error: Missing siteUrl')
    }

    return config
  }

  /**
   * Load full config
   * @returns
   */
  async loadConfig() {
    // Load base config
    const baseConfig = await this.loadBaseConfig()

    // Find the runtime paths using base config
    const runtimePaths = getRuntimePaths(baseConfig)

    // Update base config with runtime config
    const config = await this.withRuntimeConfig(baseConfig, runtimePaths)

    // Validate config
    await this.validateConfig(config)

    // Return full result
    return {
      config,
      runtimePaths,
    }
  }
}
