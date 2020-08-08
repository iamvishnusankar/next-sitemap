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
  siteUrl: 'https://example.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
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
  generateRobotsTxt: true,
}
```

Above is the minimal configuration to split a large sitemap. When the number of URLs in a sitemap is more than 5000, `next-sitemap` will create sitemap (e.g. sitemap-1.xml, sitemap-2.xml) and index (e.g. sitemap.xml) files.

## `next-sitemap.js` Options

| property                            | description                                                                        | type     |
| ----------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| siteUrl                             | Base url of your website                                                           | string   |
| changefreq (optional)               | Change frequency. Default `daily`                                                  | string   |
| priority (optional)                 | Priority. Default `0.7`                                                            | number   |
| sitemapSize(optional)               | Split large sitemap into multiple files by specifying sitemap size. Default `5000` | number   |
| generateRobotsTxt                   | Generate a `robots.txt` file and list the generated sitemaps. Default `false`      | boolean  |
| robotsTxtOptions.policies           | Policies for generating `robots.txt`. Default to `[{ userAgent: '*', allow: '/' }` | []       |
| robotsTxtOptions.additionalSitemaps | Options to add addition sitemap to `robots.txt` host entry                         | string[] |
| autoLastmod (optional)              | Add `<lastmod/>` property. Default to `true`                                       | true     |  |

## Full configuration

Here's an example `next-sitemap.js` configuration with all options

```js
module.exports = {
  siteUrl: 'https://example.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
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

## TODO

- <s>Add support for splitting sitemap</s>
- <s>Add support for `robots.txt`</s>
