/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
  IRoutesManifest,
  IConfig,
} from '../interface.js'
import { loadJSON } from '../utils/file.js'

export class ManifestParser {
  async loadManifest(
    config: IConfig,
    runtimePaths: IRuntimePaths
  ): Promise<INextManifest> {
    // Check whether static export mode
    const staticExportMode = config?.output === 'export'

    // Load build manifest
    const buildManifest = await loadJSON<IBuildManifest>(
      runtimePaths.BUILD_MANIFEST,
      !staticExportMode // Only throw error if output is not set to static export
    )!

    // Throw error if no build manifest exist
    if (!staticExportMode && !buildManifest) {
      throw new Error(
        'Unable to find build manifest, make sure to build your next project before running next-sitemap command'
      )
    }

    // Load pre-render manifest
    const preRenderManifest = await loadJSON<IPreRenderManifest>(
      runtimePaths.PRERENDER_MANIFEST,
      false
    )

    // Load routes manifest
    const routesManifest = await loadJSON<IRoutesManifest>(
      runtimePaths.ROUTES_MANIFEST,
      false
    )

    return {
      build: buildManifest ?? ({} as any),
      preRender: preRenderManifest,
      routes: routesManifest,
    }
  }
}
