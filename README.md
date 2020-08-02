# next-sitemap

Sitemap generator for next.js

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

## `next-sitemap.js` Options

| property              | description                          |
| --------------------- | ------------------------------------ |
| siteUrl               | Base url of your website             |
| changefreq (optional) | Change frequency. Default to `daily` |
| priority (optional)   | Priority. Default to `0.7`           |
