// Format site with a formater
export const formatSitemapWithPrettier = (sitemap: string): string => {
    let prettier;

    // Load prettier if dependency available
    try {
        prettier = require('prettier')
    } catch (er) {
        prettier = null;
    }

    if(!prettier) return sitemap;

    return prettier.format(sitemap, { parser: 'html' })
}