type MaybeUndefined<T> = T | undefined
type MaybePromise<T> = T | Promise<T>

type Changefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

/**
 * Robot.txt policy options
 */
export interface IRobotPolicy {
  /**
   * User agent name
   */
  userAgent: string

  /**
   * Disallow option(s)
   */
  disallow?: string | string[]

  /**
   * Allow option(s)
   */
  allow?: string | string[]

  /**
   * Crawl delay
   */
  crawlDelay?: number
}

/**
 * robots.txt Options
 */
export interface IRobotsTxt {
  /**
   * Crawl policies
   */
  policies?: IRobotPolicy[]

  /**
   * Additional sitemaps which need to be added to robots
   */
  additionalSitemaps?: string[]

  /**
   * From v2.4x onwards, generated `robots.txt` will only contain url of `index sitemap` and custom provided endpoints from `robotsTxtOptions.additionalSitemaps`
   *
   * This is to prevent duplicate url submission (once through index-sitemap -> sitemap-url and once through robots.txt -> HOST)
   *
   * Set this option `true` to add all generated sitemap endpoints to `robots.txt`
   * @default false
   */
  includeNonIndexSitemaps?: boolean

  /**
   * Custom robots.txt transformer
   */
  transformRobotsTxt?: (config: IConfig, robotsTxt: string) => Promise<string>
}

/**
 * Sitemap configuration
 */
export interface IConfig {
  /**
   * Base url of your website
   */
  siteUrl: string

  /**
   * Change frequency.
   * @default 'daily'
   */
  changefreq?: Changefreq

  /**
   * Priority
   * @default 0.7
   */
  priority?: any

  /**
   * The name of the generated sitemap file before the file extension.
   * @default "sitemap"
   */
  sitemapBaseFileName?: string

  /**
   * next.js build directory.
   * @default .next
   */
  sourceDir?: string

  /**
   * All the generated files will be exported to this directory.
   * @default public
   */
  outDir?: string

  /**
   * Split large sitemap into multiple files by specifying sitemap size.
   * @default 5000
   */
  sitemapSize?: number

  /**
   * Generate a robots.txt file and list the generated sitemaps.
   * @default false
   */
  generateRobotsTxt?: boolean

  /**
   * robots.txt options
   */
  robotsTxtOptions?: IRobotsTxt

  /**
   * Add <lastmod/> property.
   * @default true
   */
  autoLastmod?: boolean

  /**
   * Array of relative paths (wildcard pattern supported) to exclude from listing on sitemap.xml or sitemap-*.xml.
   * Apart from this option next-sitemap also offers a custom transform option which could be used to exclude urls that match specific patterns
   * @example ['/page-0', '/page-*', '/private/*']
   */
  exclude?: string[]

  alternateRefs?: Array<IAlternateRef>

  /**
   * A transformation function, which runs for each relative-path in the sitemap. Returning null value from the transformation function will result in the exclusion of that specific path from the generated sitemap list.
   * @link https://github.com/iamvishnusankar/next-sitemap#custom-transformation-function
   */
  transform?: (
    config: IConfig,
    url: string
  ) => MaybePromise<MaybeUndefined<ISitemapField>>

  /**
   * A function that returns a list of additional paths to be added to the generated sitemap list.
   * @link https://github.com/iamvishnusankar/next-sitemap#additional-paths-function
   */
  additionalPaths?: (
    config: AdditionalPathsConfig
  ) => MaybePromise<MaybeUndefined<ISitemapField>[]>

  /**
   * Include trailing slash
   */
  trailingSlash?: boolean

  /**
   * Boolean to enable/disable index sitemap generation
   * If enabled next-sitemap will generate sitemap-*.xml and sitemap.xml (index sitemap)
   * @default true
   */
  generateIndexSitemap?: boolean

  /**
   * Lastmod tag for sitemap index
   * @default false
   */
  sitemapIndexLastmod?: boolean | undefined
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
  ampFirstPages?: string[]
}

export interface IPreRenderManifest {
  routes: {
    [key: string]: any
  }
  notFoundRoutes: string[]
}

export interface IRoutesManifest {
  i18n?: {
    locales: string[]
    defaultLocale: string
  }
}

export interface IExportMarker {
  exportTrailingSlash: boolean
}

export interface INextManifest {
  build: IBuildManifest
  preRender?: IPreRenderManifest
  routes?: IRoutesManifest
}

/**
 * Use IExportable instead
 * @deprecated
 */
export interface ISitemapChunk {
  path: string
  fields: ISitemapField[]
  filename: string
}

export interface IExportable {
  url: string
  filename: string
  content: string
  type: 'robots.txt' | 'sitemap' | 'sitemap-index'
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string
  PRERENDER_MANIFEST: string
  ROUTES_MANIFEST: string
  ROBOTS_TXT_FILE: string
  EXPORT_MARKER: string
  SITEMAP_INDEX_FILE?: string
  SITEMAP_INDEX_URL?: string
}

export type IAlternateRef = {
  href: string
  hreflang: string
  hrefIsAbsolute?: boolean
}

export type IGoogleNewsEntry = {
  title: string
  date: Date | string
  publicationName: string
  publicationLanguage: string
}

export type IImageEntry = {
  loc: URL
  caption?: string
  geoLocation?: string
  title?: string
  license?: URL
}

export type IRestriction = {
  relationship: 'allow' | 'deny'
  content: string
}

export type IVideoEntry = {
  title: string
  thumbnailLoc: URL
  description: string
  contentLoc?: URL
  playerLoc?: URL
  duration?: number
  expirationDate?: Date | string
  rating?: number
  viewCount?: number
  publicationDate?: Date | string
  familyFriendly?: boolean
  restriction?: IRestriction
  platform?: IRestriction
  requiresSubscription?: boolean
  uploader?: {
    name: string
    info?: URL
  }
  live?: boolean
  tag?: string
}

export type ISitemapField = {
  loc: string
  lastmod?: string
  changefreq?: Changefreq
  priority?: number
  alternateRefs?: Array<IAlternateRef>
  trailingSlash?: boolean

  news?: IGoogleNewsEntry
  images?: Array<IImageEntry>
  videos?: Array<IVideoEntry>
}

export interface INextSitemapResult {
  sitemaps: string[]
  sitemapIndices: string[]
  runtimePaths: IRuntimePaths
}
