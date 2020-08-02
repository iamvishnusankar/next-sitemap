import fs from 'fs'
import allPath from './path'
import { INextManifest, IPreRenderManifest, IBuildManifest } from './interface'

export const loadBuildManifest = (): IBuildManifest => {
  if (fs.existsSync(allPath.NEXT_MANIFEST)) {
    return require(allPath.NEXT_MANIFEST)
  }

  throw new Error('No manifest file exist. Make sure to build the project')
}

export const loadPreRenderManifest = (): IPreRenderManifest | undefined => {
  if (fs.existsSync(allPath.PRERENDER_MANIFEST)) {
    return require(allPath.PRERENDER_MANIFEST)
  }
}

export const loadManifest = (): INextManifest => {
  const build = loadBuildManifest()
  const preRender = loadPreRenderManifest()

  return {
    build,
    preRender
  }
}
