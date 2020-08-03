# next-sitemap

Sitemap generator for next.js. `next-sitemap` will generate a sitemap file for all pages (including all pre-rendered/static pages).

## Install

```shell
yarn add next-sitemap -D
```

## Create config file

`next-sitemap` requires a basic config file (`next-sitemap.js`) under your project root

```js
module.exports = {
  siteUrl: 'https://example.com'
  // other options
}
```

## Add next-sitemap as your postbuild script

```json
{
  "build": "next build",
  "postbuild": "next-sitemap"
}
```

## Splitting large sitemap into multiple files

Define the `sitemapSize` property in `next-sitemap.js` to split large sitemap into multiple files.

```js
module.exports = {
  siteUrl: 'https://example.com',
  sitemapSize: 5000
}
```

Above is the minimal configuration to split a large sitemap. When the number of URLs in a sitemap is more than 5000, `next-sitemap` will create sitemap (e.g. sitemap-1.xml, sitemap-2.xml) and index (e.g. sitemap.xml) files.

## `next-sitemap.js` Options

| property              | description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| siteUrl               | Base url of your website                                                      |
| changefreq (optional) | Change frequency. Default to `daily`                                          |
| priority (optional)   | Priority. Default to `0.7`                                                    |
| path (optional)       | Sitemap export path. Default `public/sitemap.xml`                             |
| sitemapSize(optional) | Split large sitemap into multiple files by specifying sitemap size (eg: 5000) |

## TODO

- <s>Add support for splitting sitemap</s>
- Add support for `robots.txt`
