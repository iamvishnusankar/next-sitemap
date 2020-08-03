export interface IRobotPolicy {
  userAgent: string
  disallow?: string | string[]
  allow?: string | string[]
}

export interface IRobotsTxt {
  policies: IRobotPolicy
  additionalSitemaps: string[]
}

export interface IConfig {
  siteUrl: string
  changefreq: string
  priority: any
  path: string
  sitemapSize?: number
  generateRobotsTxt: boolean
  robotsTxtOptions?: IRobotsTxt
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
