import { absoluteUrl } from '../../url-set.js'

describe('absoluteUrl', () => {
  test('absoluteUrl: without trailing slash', () => {
    expect(absoluteUrl('https://example.com', '/', false)).toBe(
      'https://example.com'
    )

    expect(absoluteUrl('https://example.com/hello/', '/', false)).toBe(
      'https://example.com/hello'
    )
  })

  test('absoluteUrl: with trailing slash', () => {
    expect(absoluteUrl('https://example.com', '/', true)).toBe(
      'https://example.com/'
    )

    expect(absoluteUrl('https://example.com/hello/', '/', true)).toBe(
      'https://example.com/hello/'
    )
  })

  test('absoluteUrl: with uri encoding', () => {
    expect(
      absoluteUrl(`https://example.com/&/'/"/>/<`, '/', true)
    ).toMatchInlineSnapshot(
      `"https://example.com/&amp;/&apos;/&quot;/&gt;/&lt;/"`
    )
  })
})
