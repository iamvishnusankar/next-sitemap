import { isURL, cleanPath, generateUrl, isNextInternalUrl } from './index'

describe('next-sitemap', () => {
  test('isURL : Valid', () => {
    expect(isURL('https://example.com')).toBeTruthy()
  })

  test('isURL : Invalid', () => {
    expect(isURL('/someone-relative/path/item.jpg')).toBeFalsy()
  })

  test('cleanPath : Relative Path', () => {
    expect(cleanPath('./epic///awesome///path')).toBe('./epic/awesome/path')
  })

  test('cleanPath: Public Url', () => {
    expect(cleanPath('https://www.example.com//epic///awesome///path')).toBe(
      'https://www.example.com/epic/awesome/path'
    )
  })

  test('generateUrl: with relative slug', () => {
    const url = generateUrl('https://base.example.com', '//awesome/path')
    expect(url).toBe('https://base.example.com/awesome/path')
  })

  test('generateUrl: with external slug', () => {
    const url = generateUrl(
      'https://base.example.com',
      'https://cdn.another.site/new//path'
    )
    expect(url).toBe('https://cdn.another.site/new/path')
  })

  test('isNextInternalUrl', () => {
    expect(isNextInternalUrl('/_app')).toBeTruthy()
    expect(isNextInternalUrl('/404')).toBeTruthy()
    expect(isNextInternalUrl('/_random')).toBeTruthy()
  })

  test('isNextInternalUrl: url params', () => {
    expect(isNextInternalUrl('/[id]')).toBeTruthy()
    expect(isNextInternalUrl('/blog/[id]')).toBeTruthy()
  })

  test('isNextInternalUrl: allow urls with underscore`', () => {
    expect(isNextInternalUrl('/_some_url')).toBeTruthy()
    expect(isNextInternalUrl('/some_url/[param]')).toBeTruthy()

    expect(isNextInternalUrl('/some_url')).toBeFalsy()
  })
})
