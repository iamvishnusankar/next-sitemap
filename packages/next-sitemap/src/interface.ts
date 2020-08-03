export interface IConfig {
  siteUrl: string
  changefreq: string
  priority: any
  path: string
  sitemapSize?: number
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
