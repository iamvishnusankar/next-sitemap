/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INextManifest, IPreRenderManifest, IBuildManifest } from '../interface'
import { loadFile } from '../file'

export const loadManifest = (): INextManifest => {
  const build = loadFile<IBuildManifest>('')!
  const preRender = loadFile<IPreRenderManifest>('')

  return {
    build,
    preRender,
  }
}
