/* eslint-disable no-useless-escape */

export const cleanPath = (text: string): string => {
  return text.replace(/([^:])(\/\/+)/g, '$1/')
}

export const isURL = (text: string): boolean => {
  const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  return regexp.test(text)
}

export const generateUrl = (baseUrl: string, slug: string): string => {
  return isURL(slug) ? cleanPath(slug) : cleanPath(`${baseUrl}/${slug}`)
}

/**
 * Checks whether a url is next.js specific or not
 * @param path path check
 */
export const isNextInternalUrl = (path: string): boolean => {
  return new RegExp(/[^\/]*^.[_]|(?:\[)/g).test(path)
}
