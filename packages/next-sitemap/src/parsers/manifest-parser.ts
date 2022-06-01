/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
  IRoutesManifest,
} from '../interface.js'
import { loadFile } from '../utils/file.js'

export class ManifestParser {
  async loadManifest(runtimePaths: IRuntimePaths): Promise<INextManifest> {
    // Load build manifest
    const buildManifest = await loadFile<IBuildManifest>(
      runtimePaths.BUILD_MANIFEST
    )!

    // Throw error if no build manifest exist
    if (!buildManifest) {
      throw new Error(
        'Unable to find build manifest, make sure to build your next project before running next-sitemap command'
      )
    }

    // Load pre-render manifest
    const preRenderManifest = await loadFile<IPreRenderManifest>(
      runtimePaths.PRERENDER_MANIFEST,
      false
    )

    // Load routes manifest
    const routesManifest = await loadFile<IRoutesManifest>(
      runtimePaths.ROUTES_MANIFEST,
      false
    )

    return {
      build: buildManifest,
      preRender: preRenderManifest,
      routes: routesManifest,
    }
  }
}
