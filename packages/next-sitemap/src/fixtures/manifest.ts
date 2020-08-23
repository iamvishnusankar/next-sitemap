import { IBuildManifest, IPreRenderManifest, INextManifest } from '../interface'

export const sampleBuildManifest: IBuildManifest = {
  pages: {
    '/': [],
    '/[dynamic]': [],
    '/_app': [],
    '/_error': [],
  },
}

export const samplePreRenderManifest: IPreRenderManifest = {
  routes: {
    '/page-0': {},
    '/page-1': {},
    '/page-2': {},
    '/page-3': {},
  },
}

export const sampleManifest: INextManifest = {
  build: sampleBuildManifest,
  preRender: samplePreRenderManifest,
}
