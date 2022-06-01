import { sampleConfig } from '../../../__fixtures__/config'
import { sampleManifest } from '../../../__fixtures__/manifest'
import { UrlSetBuilder } from '../../url-set-builder'

let urlSetBuilder: UrlSetBuilder

beforeEach(() => {
  urlSetBuilder = new UrlSetBuilder(sampleConfig, sampleManifest)
})

describe('UrlSetBuilder', () => {
  test('absoluteUrl: without trailing slash', () => {
    expect(urlSetBuilder.absoluteUrl('https://example.com', '/', false)).toBe(
      'https://example.com'
    )

    expect(
      urlSetBuilder.absoluteUrl('https://example.com/hello/', '/', false)
    ).toBe('https://example.com/hello')
  })

  test('absoluteUrl: with trailing slash', () => {
    expect(urlSetBuilder.absoluteUrl('https://example.com', '/', true)).toBe(
      'https://example.com/'
    )

    expect(
      urlSetBuilder.absoluteUrl('https://example.com/hello/', '/', true)
    ).toBe('https://example.com/hello/')
  })

  test('absoluteUrl: with uri encoding', () => {
    expect(
      urlSetBuilder.absoluteUrl(`https://example.com/&/'/"/>/<`, '/', true)
    ).toMatchInlineSnapshot(
      `"https://example.com/&amp;/&apos;/&quot;/&gt;/&lt;/"`
    )
  })
})
