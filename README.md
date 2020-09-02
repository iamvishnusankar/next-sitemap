# next-sitemap

Sitemap generator for next.js. Generate sitemap(s) and robots.txt for all static/pre-rendered pages.

## Table of contents

- Getting started
  - [Installation](#installation)
  - [Create config file](#create-config-file)
  - [Building sitemaps](#building-sitemaps)
- [Splitting large sitemap into multiple files](#splitting-large-sitemap-into-multiple-files)
- [Configuration Options](#next-sitemapjs-options)
- [Custom transformation function](#custom-transformation-function)
- [Full configuration example](#full-configuration-example)

## Getting started

### Installation

```shell
yarn add next-sitemap -D
```

### Create config file

`next-sitemap` requires a basic config file (`next-sitemap.js`) under your project root

```js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
```

### Building sitemaps

Add next-sitemap as your postbuild script

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
  generateRobotsTxt: true,
  sitemapSize: 7000,
}
```

Above is the minimal configuration to split a large sitemap. When the number of URLs in a sitemap is more than 7000, `next-sitemap` will create sitemap (e.g. sitemap-1.xml, sitemap-2.xml) and index (e.g. sitemap.xml) files.

## Configuration Options

| property                            | description                                                                                                                                                                                                                                                              | type     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| siteUrl                             | Base url of your website                                                                                                                                                                                                                                                 | string   |
| changefreq (optional)               | Change frequency. Default `daily`                                                                                                                                                                                                                                        | string   |
| priority (optional)                 | Priority. Default `0.7`                                                                                                                                                                                                                                                  | number   |
| sitemapSize(optional)               | Split large sitemap into multiple files by specifying sitemap size. Default `5000`                                                                                                                                                                                       | number   |
| generateRobotsTxt                   | Generate a `robots.txt` file and list the generated sitemaps. Default `false`                                                                                                                                                                                            | boolean  |
| robotsTxtOptions.policies           | Policies for generating `robots.txt`. Default to `[{ userAgent: '*', allow: '/' }`                                                                                                                                                                                       | []       |
| robotsTxtOptions.additionalSitemaps | Options to add addition sitemap to `robots.txt` host entry                                                                                                                                                                                                               | string[] |
| autoLastmod (optional)              | Add `<lastmod/>` property. Default to `true`                                                                                                                                                                                                                             | true     |  |
| exclude (optional)                  | Array of **relative** paths to exclude from listing on `sitemap.xml` or `sitemap-*.xml`. e.g.: `['/page-0', '/page-4']`. Apart from this options `next-sitemap` also offers a custom `transform` option which could be used to exclude urls that match specific patterns | string[] |
| sourceDir                           | next.js build directory. Default `.next`                                                                                                                                                                                                                                 | string   |
| outDir (optional)                   | All the generated files will be exported to this directory. Default `public`                                                                                                                                                                                             | string   |
| transform (optional)                | A transformation function, which runs **for each** url in the sitemap. Returning `null` value from the transformation function will result in the exclusion of that specific url from the generated sitemap list.                                                        | function |

## Custom transformation function

A transformation function, which runs **for each** url in the sitemap. Returning `null` value from the transformation function will result in the exclusion of that specific url from the generated sitemap list.

```jsx
module.exports = {
  transform: (config, url) => {
    // custom function to ignore the url
    if (customIgnoreFunction(url)) {
      return null
    }

    // only create changefreq along with url
    // returning partial properties will result in generation of XML field with only returned values.
    if (customLimitedField(url)) {
      // This returns `url` & `changefreq`. Hence it will result in the generation of XML field with `url` and  `changefreq` properties only.
      return {
        url,
        changefreq: 'weekly',
      }
    }

    return {
      url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
```

## Full configuration example

Here's an example `next-sitemap.js` configuration with all options

```js
module.exports = {
  siteUrl: 'https://example.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/protected-page', '/awesome/secret-page'],
  // Default transformation function
  transform: (config, url) => {
    return {
      url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'test-bot',
        allow: ['/path', '/path-2'],
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/sub-path-1', '/path-2'],
      },
    ],
    additionalSitemaps: [
      'https://example.com/my-custom-sitemap-1.xml',
      'https://example.com/my-custom-sitemap-2.xml',
      'https://example.com/my-custom-sitemap-3.xml',
    ],
  },
}
```

Above configuration will generate sitemaps based on your project and a `robots.txt` like this.

```txt
User-agent: *
Allow: /
User-agent: black-listed-bot
Disallow: /sub-path-1
Disallow: /path-2
Host: https://example.com

....
<---Generated sitemap list--->
....

Sitemap: https://example.com/my-custom-sitemap-1.xml
Sitemap: https://example.com/my-custom-sitemap-2.xml
Sitemap: https://example.com/my-custom-sitemap-3.xml
```
