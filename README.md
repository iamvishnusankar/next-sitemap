# next-sitemap

Sitemap generator for next.js. Generate sitemap(s) and robots.txt for all static/pre-rendered/dynamic/server-side pages.

## Table of contents

- Getting started
  - [Installation](#installation)
  - [Create config file](#create-config-file)
  - [Building sitemaps](#building-sitemaps)
- [Splitting large sitemap into multiple files](#splitting-large-sitemap-into-multiple-files)
- [Configuration Options](#configuration-options)
- [Custom transformation function](#custom-transformation-function)
- [Full configuration example](#full-configuration-example)
- [Generating dynamic/server-side sitemaps](#generating-dynamicserver-side-sitemaps)

## Getting started

### Installation

```shell
yarn add next-sitemap -D
```

### Create config file

`next-sitemap` requires a basic config file (`next-sitemap.js`) under your project root

> ✅ `next-sitemap` now loads environment variables from `.env` files by default.

```js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
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

Having `next-sitemap` command & `next-sitemap.js` file may result in file opening instead of building sitemaps in windows machines. [Please read more about the issue here.](https://github.com/iamvishnusankar/next-sitemap/issues/61#issuecomment-725999452)

As a solution to this, it is now possible to use a custom config file instead of `next-sitemap.js`. Just pass `--config <your-config-file>.js` to build command.

From now onwards:

- `next-sitemap` uses configuration from `next-sitemap.js`
- `next-sitemap --config <custom-config-file>.js` uses config from `<custom-config-file>.js`

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

| property                                       | description                                                                                                                                                                                                                                                                                                                                                       | type           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| siteUrl                                        | Base url of your website                                                                                                                                                                                                                                                                                                                                          | string         |
| changefreq (optional)                          | Change frequency. Default `daily`                                                                                                                                                                                                                                                                                                                                 | string         |
| priority (optional)                            | Priority. Default `0.7`                                                                                                                                                                                                                                                                                                                                           | number         |
| sitemapBaseFileName (optional)                 | The name of the generated sitemap file before the file extension. Default `"sitemap"`                                                                                                                                                                                                                                                                             | string         |
| alternateRefs (optional)                       | Denote multi-language support by unique URL. Default `[]`                                                                                                                                                                                                                                                                                                         | AlternateRef[] |
| sitemapSize(optional)                          | Split large sitemap into multiple files by specifying sitemap size. Default `5000`                                                                                                                                                                                                                                                                                | number         |
| generateRobotsTxt (optional)                   | Generate a `robots.txt` file and list the generated sitemaps. Default `false`                                                                                                                                                                                                                                                                                     | boolean        |
| robotsTxtOptions.policies (optional)           | Policies for generating `robots.txt`. Default `[{ userAgent: '*', allow: '/' }]`                                                                                                                                                                                                                                                                                  | []             |
| robotsTxtOptions.additionalSitemaps (optional) | Options to add addition sitemap to `robots.txt` host entry                                                                                                                                                                                                                                                                                                        | string[]       |
| autoLastmod (optional)                         | Add `<lastmod/>` property. Default `true`                                                                                                                                                                                                                                                                                                                         | true           |
| exclude (optional)                             | Array of **relative** paths ([wildcard pattern supported](https://www.npmjs.com/package/matcher#usage)) to exclude from listing on `sitemap.xml` or `sitemap-*.xml`. e.g.: `['/page-0', '/page-*', '/private/*']`. Apart from this option `next-sitemap` also offers a custom `transform` option which could be used to exclude urls that match specific patterns | string[]       |
| sourceDir (optional)                           | next.js build directory. Default `.next`                                                                                                                                                                                                                                                                                                                          | string         |
| outDir (optional)                              | All the generated files will be exported to this directory. Default `public`                                                                                                                                                                                                                                                                                      | string         |
| transform (optional)                           | A transformation function, which runs **for each** `relative-path` in the sitemap. Returning `null` value from the transformation function will result in the exclusion of that specific `path` from the generated sitemap list.                                                                                                                                  | async function |
| additionalPaths (optional)                     | A function that returns a list of additional paths to be added to the general list.                                                                                                                                                                                                                                                                               | async function |

## Custom transformation function

Custom transformation provides an extension method to add, remove or exclude `path` or `properties` from a url-set. Transform function runs **for each** `relative path` in the sitemap. And use the `key`: `value` object to add properties in the XML.

Returning `null` value from the transformation function will result in the exclusion of that specific `relative-path` from the generated sitemap list.

```jsx
module.exports = {
  transform: async (config, path) => {
    // custom function to ignore the path
    if (customIgnoreFunction(path)) {
      return null
    }

    // only create changefreq along with path
    // returning partial properties will result in generation of XML field with only returned values.
    if (customLimitedField(path)) {
      // This returns `path` & `changefreq`. Hence it will result in the generation of XML field with `path` and  `changefreq` properties only.
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: 'weekly',
      }
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
```

## Additional paths function

`additionalPaths` this function can be useful if you have a large list of pages, but you don't want to render them all and use [fallback: true](https://nextjs.org/docs/basic-features/data-fetching#fallback-true). Result of executing this function will be added to the general list of paths and processed with `sitemapSize`. You are free to add dynamic paths, but unlike `additionalSitemap`, you do not need to split the list of paths into different files in case there are a lot of paths for one file.

If your function returns a path that already exists, then it will simply be updated, duplication will not happen.

```js
module.exports = {
  additionalPaths: async (config) => {
    const result = []

    // required value only
    result.push({ loc: '/additional-page-1' })

    // all possible values
    result.push({
      loc: '/additional-page-2',
      changefreq: 'yearly',
      priority: 0.7,
      lastmod: new Date().toISOString(),

      // acts only on '/additional-page-2'
      alternateRefs: [
        {
          href: 'https://es.example.com',
          hreflang: 'es',
        },
        {
          href: 'https://fr.example.com',
          hreflang: 'fr',
        },
      ],
    })

    // using transformation from the current configuration
    result.push(await config.transform(config, '/additional-page-3'))

    return result
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
  alternateRefs: [
    {
      href: 'https://es.example.com',
      hreflang: 'es',
    },
    {
      href: 'https://fr.example.com',
      hreflang: 'fr',
    },
  ],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/additional-page'),
  ],
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
# *
User-agent: *
Allow: /

# test-bot
User-agent: test-bot
Allow: /path
Allow: /path-2

# black-listed-bot
User-agent: black-listed-bot
Disallow: /sub-path-1
Disallow: /path-2

# Host
Host: https://example.com

# Sitemaps
....
<---Generated sitemap list--->
....
Sitemap: https://example.com/my-custom-sitemap-1.xml
Sitemap: https://example.com/my-custom-sitemap-2.xml
Sitemap: https://example.com/my-custom-sitemap-3.xml
```

## Generating dynamic/server-side sitemaps

`next-sitemap` now provides a simple API to generate server side sitemaps. This will help to dynamically generate sitemaps by sourcing data from CMS or custom source.

Here's a sample script to generate sitemaps on server side. Create `pages/server-sitemap.xml/index.tsx` page and add the following content.

```ts
// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const fields = [
    {
      loc: 'https://example.com', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://example.com/dynamic-path-2', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}
```

Now, `next.js` is serving the dynamic sitemap from `http://localhost:3000/server-sitemap.xml`.

List the dynamic sitemap page in `robotTxtOptions.additionalSitemaps` and exclude this path from static sitemap list.

```js
// next-sitemap.js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/server-sitemap.xml', // <==== Add here
    ],
  },
}
```

In this way, `next-sitemap` will manage the sitemaps for all your static pages and your dynamic sitemap will be listed on robots.txt.

## Contribution

All PRs are welcome :)
