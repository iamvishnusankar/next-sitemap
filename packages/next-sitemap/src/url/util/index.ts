/* eslint-disable no-useless-escape */

export const cleanPath = (text: string): string => {
  return text.replace(/([^:])(\/\/+)/g, '$1/')
}

export const isURL = (text: string): boolean => {
  // old: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  return /^https?:\/\//i.test(text)
}

export const generateUrl = (baseUrl: string, slug: string): string => {
  return isURL(slug) ? cleanPath(slug) : cleanPath(`${baseUrl}/${slug}`)
}

/**
 * Checks whether a url is next.js specific or not
 * @param path path check
 */
export const isNextInternalUrl = (path: string): boolean => {
  return new RegExp(/[^\/]*^.[_]|^\/404$|(?:\[)/g).test(path)
}

/**
 * Creates a replace function to replace the default locale
 * Avoids creating the same RegExp within each replace
 *
 * Replaces only if the path does not contain the locale as an actual valid path
 *
 * Given a default locale of en-US it replaces:
 * /en-US -> /
 * /en-US/home -> /home
 * /en-US/home/ -> /home/
 *
 * Does not replace if its actual page
 * /en-USA -> /en-USA
 * /en-USA/home -> /en-USA/home
 * /en-US-home -> /en-US-home
 *
 * @param defaultLocale defaultLocale as provided by i18n within next config
 */
export const createDefaultLocaleReplace = (defaultLocale: string): any => {
  const defaultLocaleRegExp = new RegExp(`^/${defaultLocale}($|/)`)
  return (path: string): string => path.replace(defaultLocaleRegExp, '/')
}
