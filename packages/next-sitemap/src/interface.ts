type MaybeUndefined<T> = T | undefined
type MaybePromise<T> = T | Promise<T>

export interface IRobotPolicy {
  userAgent: string
  disallow?: string | string[]
  allow?: string | string[]
}

export interface IRobotsTxt {
  policies?: IRobotPolicy[]
  additionalSitemaps?: string[]
}

export interface IConfig {
  siteUrl: string
  changefreq: string
  priority: any
  sitemapBaseFileName?: string
  sourceDir?: string
  outDir?: string
  sitemapSize?: number
  generateRobotsTxt: boolean
  robotsTxtOptions?: IRobotsTxt
  autoLastmod?: boolean
  exclude?: string[]
  alternateRefs?: Array<AlternateRef>
  transform?: (
    config: IConfig,
    url: string
  ) => MaybePromise<MaybeUndefined<ISitemapField>>
  additionalPaths?: (
    config: AdditionalPathsConfig
  ) => MaybePromise<MaybeUndefined<ISitemapField>[]>
  trailingSlash?: boolean
}

export type AdditionalPathsConfig = Readonly<
  IConfig & {
    transform: NonNullable<IConfig['transform']>
  }
>

export interface IBuildManifest {
  pages: {
    [key: string]: string[]
  }
}

export interface IPreRenderManifest {
  routes: {
    [key: string]: any
  }
}

export interface IExportMarker {
  exportTrailingSlash: boolean
}

export interface INextManifest {
  build: IBuildManifest
  preRender?: IPreRenderManifest
}

export interface ISitemapChunk {
  path: string
  fields: ISitemapField[]
  filename: string
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string
  PRERENDER_MANIFEST: string
  SITEMAP_FILE: string
  ROBOTS_TXT_FILE: string
  EXPORT_MARKER: string
}

export type AlternateRef = {
  href: string
  hreflang: string
}

export type ISitemapField = {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
  alternateRefs?: Array<AlternateRef>
  news?: News
}

export interface News {
  publication: NewsPublication
  publication_date: string
  title: string
}

export interface NewsPublication {
  name: string
  language: string
}
