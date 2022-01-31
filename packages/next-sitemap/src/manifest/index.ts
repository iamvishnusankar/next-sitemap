/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
  IRoutesManifest,
} from '../interface'
import { loadFile } from '../file'

export const loadManifest = async (
  runtimePaths: IRuntimePaths
): Promise<INextManifest> => {
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
