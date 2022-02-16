export const buildSitemapIndexXML = (allSitemaps: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSitemaps?.map((x) => `<sitemap><loc>${x}</loc></sitemap>`).join('\n')}
</sitemapindex>`
}
