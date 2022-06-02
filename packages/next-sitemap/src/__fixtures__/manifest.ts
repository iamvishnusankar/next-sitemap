import type {
  IBuildManifest,
  IPreRenderManifest,
  IRoutesManifest,
  INextManifest,
} from '../interface.js'

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
  notFoundRoutes: [],
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
  notFoundRoutes: [],
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

export const sampleNotFoundRoutesBuildManifest: IBuildManifest = {
  pages: {
    '/': [],
    '/about': [],
    '/[dynamic]': [],
    '/_app': [],
    '/_error': [],
  },
}
export const sampleNotFoundRoutesPreRenderManifest: IPreRenderManifest = {
  routes: {
    '/en-US': {},
    '/fr': {},
    '/nl-NL': {},

    '/en-US/about': {},
    '/fr/about': {},
    '/nl-NL/about': {},

    '/en-US/page-0': {},
    '/fr/page-0': {},
    '/nl-NL/page-0': {},

    '/en-US/page-1': {},
    '/fr/page-1': {},
    '/nl-NL/page-1': {},
  },
  notFoundRoutes: [
    '/fr',
    '/nl-NL/about',
    '/nl-NL/page-0',
    '/fr/page-1',
    '/nl-NL/page-1',
  ],
}

export const sampleNotFoundRoutesRenderManifest: IRoutesManifest = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
}

export const sampleNotFoundRoutesManifest: INextManifest = {
  build: sampleNotFoundRoutesBuildManifest,
  preRender: sampleNotFoundRoutesPreRenderManifest,
  routes: sampleNotFoundRoutesRenderManifest,
}
