/* eslint-disable no-useless-escape */
import { INextManifest, IConfig } from '../interface'

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
 * Create a unique url set
 * @param config
 * @param manifest
 */
export const createUrlSet = (
  config: IConfig,
  manifest: INextManifest
): string[] => {
  const allKeys = [
    ...Object.keys(manifest.build.pages),
    ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
  ]

  const urlSet = new Set(
    allKeys.flatMap((x) =>
      !isNextInternalUrl(x) ? generateUrl(config.siteUrl, x) : []
    )
  )

  return [...urlSet]
}

/**
 * Checks whether a url is next.js specific or not
 * @param path path check
 */
export const isNextInternalUrl = (path: string): boolean => {
  return new RegExp(/[^\/]*[_\[]+(.*)/g).test(path)
}
