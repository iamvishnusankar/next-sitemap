/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
  IRoutesManifest,
  IConfig,
} from '../interface.js'
import { Logger } from '../logger.js'
import { loadJSON } from '../utils/file.js'
import fg from 'fast-glob'

export class ManifestParser {
  /**
   * Return paths of html files if config.output = "export"
   * @param exportFolder
   * @returns
   */
  async getStaticExportPages(config: IConfig, exportFolder: string) {
    // Skip this step if config.output is not export mode
    if (config?.output !== 'export') {
      return []
    }

    // Get html file paths using glob
    const htmlFiles = await fg(`${exportFolder}/**/*.html`)

    // Cleanup files
    return htmlFiles?.map((file) =>
      file
        .replace(exportFolder, '')
        .replace('index', '')
        .replace('.html', '')
        .trim()
    )
  }

  async loadManifest(
    config: IConfig,
    runtimePaths: IRuntimePaths
  ): Promise<INextManifest> {
    // Load build manifest
    const buildManifest = await loadJSON<IBuildManifest>(
      runtimePaths.BUILD_MANIFEST
    )!

    // Throw error if no build manifest exist
    if (config?.output !== 'export' && !buildManifest) {
      throw Logger.noBuildManifest()
    }

    // Load pre-render manifest
    const preRenderManifest = await loadJSON<IPreRenderManifest>(
      runtimePaths.PRERENDER_MANIFEST
    )

    // Load routes manifest
    const routesManifest = await loadJSON<IRoutesManifest>(
      runtimePaths.ROUTES_MANIFEST
    )

    // Get static export path when output is set as "export"
    const staticExportPages = await this.getStaticExportPages(
      config,
      runtimePaths.STATIC_EXPORT_ROOT
    )

    return {
      build: buildManifest ?? ({} as any),
      preRender: preRenderManifest,
      routes: routesManifest,
      staticExportPages,
    }
  }
}
