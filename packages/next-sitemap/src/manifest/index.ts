/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
  IRoutesManifest,
} from '../interface'
import { loadFile } from '../file'

export const loadManifest = (runtimePaths: IRuntimePaths): INextManifest => {
  const build = loadFile<IBuildManifest>(runtimePaths.BUILD_MANIFEST)!

  const preRender = loadFile<IPreRenderManifest>(
    runtimePaths.PRERENDER_MANIFEST,
    false
  )

  const routes = loadFile<IRoutesManifest>(
    runtimePaths.ROUTES_MANIFEST,
    false
  )

  return {
    build,
    preRender,
    routes,
  }
}
