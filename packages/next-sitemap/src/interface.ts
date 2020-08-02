export interface IConfig {
  siteUrl: string
  changefreq: string
  priority: string
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
