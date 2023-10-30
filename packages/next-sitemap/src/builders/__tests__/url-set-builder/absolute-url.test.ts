import { sampleConfig } from '../../../__fixtures__/config.js'
import { sampleManifest } from '../../../__fixtures__/manifest.js'
import { UrlSetBuilder } from '../../url-set-builder.js'

let urlSetBuilder: UrlSetBuilder

beforeEach(() => {
  urlSetBuilder = new UrlSetBuilder(sampleConfig, sampleManifest)
})

describe('UrlSetBuilder', () => {
  test('absoluteUrl: Without trailing slash', () => {
    expect(urlSetBuilder.absoluteUrl('https://example.com', '/', false)).toBe(
      'https://example.com'
    )

    expect(
      urlSetBuilder.absoluteUrl('https://example.com/hello/', '/', false)
    ).toBe('https://example.com/hello')
  })

  test('absoluteUrl: With trailing slash', () => {
    expect(urlSetBuilder.absoluteUrl('https://example.com', '/', true)).toBe(
      'https://example.com/'
    )

    expect(
      urlSetBuilder.absoluteUrl('https://example.com/hello/', '/', true)
    ).toBe('https://example.com/hello/')
  })

  test('absoluteUrl: With uri encoding', () => {
    expect(
      urlSetBuilder.absoluteUrl(`https://example.com/&/'/"/>/<`, '/', true)
    ).toMatchSnapshot()
  })
})
