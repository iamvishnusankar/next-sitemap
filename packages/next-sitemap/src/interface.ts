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

export interface INextManifest {
  build: IBuildManifest
  preRender?: IPreRenderManifest
}

export interface ISitemapChunk {
  path: string
  urls: string[]
  filename: string
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string
  PRERENDER_MANIFEST: string
  SITEMAP_FILE: string
  ROBOTS_TXT_FILE: string
}
