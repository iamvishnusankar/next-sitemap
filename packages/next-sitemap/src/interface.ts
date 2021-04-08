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
  transform?: (config: IConfig, url: string) => Promise<ISitemapFiled>
  trailingSlash?: boolean;
  i18n?: {
    defaultLocale?: string;
    locales?: string[];
  }
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
  fields: ISitemapFiled[]
  filename: string
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string
  PRERENDER_MANIFEST: string
  SITEMAP_FILE: string
  ROBOTS_TXT_FILE: string
  EXPORT_MARKER: string
}

export interface ISitemapFiled extends ISitemapFields {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export type ISitemapFields = {
  [p: string]: ISitemapField;
}

export type ISitemapField = string | ISitemapFields | [string | null, ISitemapFieldAttributes] | undefined;

export type ISitemapFieldAttributes = {
  [p: string]: any;
};
