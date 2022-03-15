import {
  isURL,
  cleanPath,
  generateUrl,
  isNextInternalUrl,
  createDefaultLocaleReplace,
} from './index'

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
    expect(isNextInternalUrl('/500')).toBeTruthy()
    expect(isNextInternalUrl('/_random')).toBeTruthy()
    expect(isNextInternalUrl('/_middleware')).toBeTruthy()
    expect(isNextInternalUrl('/about/_middleware')).toBeTruthy()
    expect(isNextInternalUrl('/some_url/about/_middleware')).toBeTruthy()
    expect(isNextInternalUrl('/projects/[id]/_middleware')).toBeTruthy()
  })

  test('isNextInternalUrl: url params', () => {
    expect(isNextInternalUrl('/[id]')).toBeTruthy()
    expect(isNextInternalUrl('/blog/[id]')).toBeTruthy()
  })

  test('isNextInternalUrl: allow urls with underscore`', () => {
    expect(isNextInternalUrl('/_some_url')).toBeTruthy()
    expect(isNextInternalUrl('/some_url/[param]')).toBeTruthy()

    expect(isNextInternalUrl('/some_url')).toBeFalsy()
    expect(isNextInternalUrl('/some-404')).toBeFalsy()
    expect(isNextInternalUrl('/some-500')).toBeFalsy()
  })

  test('createDefaultLocaleReplace: replaces default locale within path`', () => {
    const replaceDefaultLocale = createDefaultLocaleReplace('en-US')

    expect(replaceDefaultLocale('/')).toBe('/')
    expect(replaceDefaultLocale('/en-US')).toBe('/')
    expect(replaceDefaultLocale('/en-US/')).toBe('/')
    expect(replaceDefaultLocale('/en-US/home')).toBe('/home')
    expect(replaceDefaultLocale('/en-US/home/')).toBe('/home/')
    expect(replaceDefaultLocale('/en-US-home')).toBe('/en-US-home')
    expect(replaceDefaultLocale('/en-USA/home')).toBe('/en-USA/home')
    expect(replaceDefaultLocale('/fr')).toBe('/fr')
    expect(replaceDefaultLocale('/fr/about')).toBe('/fr/about')
  })
})
