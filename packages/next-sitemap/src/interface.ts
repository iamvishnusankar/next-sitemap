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
  changefreq: Changefreq

  /**
   * Priority
   * @default 0.7
   */
  priority: any

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
  generateRobotsTxt: boolean

  /**
   * robots.txt options
   */
  robotsTxtOptions?: IRobotsTxt

  /**
   * Additional sitemap indices to be listed on robots.txt
   */
  additionalSitemapIndices?: string[]

  /**
   * Additional sitemaps which need to be added to robots
   */
  additionalSitemaps?: string[]

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

  alternateRefs?: Array<AlternateRef>

  /**
   * A transformation function, which runs for each relative-path in the sitemap. Returning null value from the transformation function will result in the exclusion of that specific path from the generated sitemap list.
   * @link https://github.com/iamvishnusankar/next-sitemap#custom-transformation-function
   */
  transform?: (
    config: IConfig,
    url: string
  ) => MaybePromise<MaybeUndefined<ISitemapField>>

  /**
   * Async function that returns a list of additional paths to be added to the general list.
   * @link https://github.com/iamvishnusankar/next-sitemap#additional-paths-function
   */
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

export interface ISitemapChunk {
  path: string
  fields: ISitemapField[]
  filename: string
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string
  PRERENDER_MANIFEST: string
  ROUTES_MANIFEST: string
  ROBOTS_TXT_FILE: string
  EXPORT_MARKER: string
  SITEMAP_INDEX_FILE: string
  SITEMAP_INDEX_URL: string
}

export type AlternateRef = {
  href: string
  hreflang: string
  hrefIsAbsolute?: boolean
}

export type ISitemapField = {
  loc: string
  lastmod?: string
  changefreq?: Changefreq
  priority?: number
  alternateRefs?: Array<AlternateRef>
}
