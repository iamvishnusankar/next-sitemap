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
 * LLMs.txt section with links
 */
export interface ILLMsSection {
  /**
   * Section title (H2)
   */
  title: string

  /**
   * List of links in this section
   */
  links: Array<{
    /**
     * Link title
     */
    title: string

    /**
     * Link URL
     */
    url: string

    /**
     * Optional details about the link
     */
    details?: string
  }>

  /**
   * Whether this section is optional
   * (can be skipped if a shorter context is needed)
   */
  isOptional?: boolean
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
 * llms.txt Options based on the specification at https://llmstxt.org/
 */
export interface ILLMsTxt {
  /**
   * Title of the project/website (H1 - Required)
   * Example: "# My Website"
   */
  title: string

  /**
   * Short summary description of the project (blockquote - Recommended)
   * Example: "> This is a website about web technologies and best practices"
   */
  description?: string

  /**
   * Additional details (optional paragraphs, lists, etc.)
   * Example:
   * ```
   * Important notes:
   * - This site uses Next.js for server-side rendering
   * - Documentation is organized by topic
   * ```
   */
  details?: string

  /**
   * File lists with H2 headers containing links to resources
   * Example:
   * ```
   * ## Documentation
   * - [API Reference](https://example.com/api): Full API documentation
   * - [Getting Started](https://example.com/start): Guide for beginners
   * 
   * ## Examples
   * - [Basic Usage](https://example.com/examples/basic): Simple examples
   * ```
   */
  sections?: Array<{
    /**
     * Section title (H2)
     */
    title: string

    /**
     * List of links in this section
     */
    links: Array<{
      /**
       * Link title
       */
      title: string

      /**
       * Link URL
       */
      url: string

      /**
       * Optional details about the link (will be shown after the link with a colon)
       */
      details?: string
    }>

    /**
     * Mark section as optional (will add '(optional)' to the section title)
     */
    isOptional?: boolean
  }>

  /**
   * Custom llms.txt transformer for advanced customization
   */
  transformLLMsTxt?: (config: IConfig, llmsTxt: string) => Promise<string>
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
   * The type of build output.
   * @see https://nextjs.org/docs/pages/api-reference/next-config-js/output
   */
  output?: 'standalone' | 'export' | undefined

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
   * Generate a llms.txt file for large language model policies
   * @default false
   */
  generateLLMsTxt?: boolean

  /**
   * llms.txt options
   */
  llmsTxtOptions?: ILLMsTxt

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
  exclude?: string[] | (() => Promise<string[]>)

  alternateRefs?: Array<IAlternateRef>

  /**
   * A transformation function, which runs for each relative-path in the sitemap. Returning null value from the transformation function will result in the exclusion of that specific path from the generated sitemap list.
   * @link https://github.com/iamvishnusankar/next-sitemap#custom-transformation-function
   */
  transform?: (
    config: IConfig,
    url: string,
  ) => MaybePromise<MaybeUndefined<ISitemapField>>

  /**
   * A function that returns a list of additional paths to be added to the generated sitemap list.
   * @link https://github.com/iamvishnusankar/next-sitemap#additional-paths-function
   */
  additionalPaths?: (
    config: AdditionalPathsConfig,
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
  build?: IBuildManifest
  preRender?: IPreRenderManifest
  routes?: IRoutesManifest
  staticExportPages?: string[]
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
  type: 'robots.txt' | 'llms.txt' | 'sitemap' | 'sitemap-index'
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string
  PRERENDER_MANIFEST: string
  ROUTES_MANIFEST: string
  ROBOTS_TXT_FILE: string
  LLMS_TXT_FILE: string
  EXPORT_MARKER: string
  SITEMAP_INDEX_FILE?: string
  SITEMAP_INDEX_URL?: string
  STATIC_EXPORT_ROOT: string
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
  loc: URL | string
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
