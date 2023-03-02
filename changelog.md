## 4.0.x

v4.0.x added support for next13.2+ `appDir` via [Custom Route Handlers](https://nextjs.org/blog/next-13-2#custom-route-handlers)

### API Changes

Generating dynamic/server-side sitemaps

- getServerSideSitemapIndex: Generates index sitemaps based on urls provided and returns application/xml response. Supports next13+ route.{ts,js} file.

  - To continue using inside pages directory, import getServerSideSitemapIndexLegacy instead.

- getServerSideSitemap: Generates sitemap based on field entires and returns application/xml response. Supports next13+ route.{ts,js} file.

  - To continue using inside pages directory, import getServerSideSitemapLegacy instead.
