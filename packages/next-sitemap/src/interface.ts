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
  sourceDir?: string
  outDir?: string
  sitemapSize?: number
  generateRobotsTxt: boolean
  robotsTxtOptions?: IRobotsTxt
  autoLastmod?: boolean
  exclude?: string[]
  alternateRefs?: Array<AlternateRef>
  transform?: (config: IConfig, url: string) => Promise<ISitemapField>
  trailingSlash?: boolean
}

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
  priority?: string
  alternateRefs?: Array<AlternateRef>
}
