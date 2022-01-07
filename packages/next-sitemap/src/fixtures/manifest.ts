import {
  IBuildManifest,
  IPreRenderManifest,
  IRoutesManifest,
  INextManifest,
} from '../interface'

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

export const sampleI18nBuildManifest: IBuildManifest = {
  pages: {
    '/': [],
    '/about': [],
    '/[dynamic]': [],
    '/_app': [],
    '/_error': [],
  },
}

export const sampleI18nPreRenderManifest: IPreRenderManifest = {
  routes: {
    '/en-US': {},
    '/fr': {},
    '/en-US/about': {},
    '/fr/about': {},
    '/page-0': {},
    '/page-1': {},
    '/en-US/page-1': {},
    '/page-2': {},
    '/fr/page-2': {},
    '/page-3': {},
  },
}

export const sampleRenderManifest: IRoutesManifest = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL', 'nl-BE'],
    defaultLocale: 'en-US',
  },
}

export const sampleI18nManifest: INextManifest = {
  build: sampleI18nBuildManifest,
  preRender: sampleI18nPreRenderManifest,
  routes: sampleRenderManifest,
}
