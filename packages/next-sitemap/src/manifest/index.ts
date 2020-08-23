/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
} from '../interface'
import { loadFile } from '../file'

export const loadManifest = (runtimePaths: IRuntimePaths): INextManifest => {
  const build = loadFile<IBuildManifest>(runtimePaths.BUILD_MANIFEST)!

  const preRender = loadFile<IPreRenderManifest>(
    runtimePaths.PRERENDER_MANIFEST,
    false
  )

  return {
    build,
    preRender,
  }
}
