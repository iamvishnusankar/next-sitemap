import {
  toChunks,
  toArray,
  removeFromArray,
  removeIfMatchPattern,
} from './index'

describe('next-sitemap/array', () => {
  test('toChunks', () => {
    const inputArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chunkSize = 3

    const chunks = toChunks(inputArray, chunkSize)
    expect(chunks).toStrictEqual([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10],
    ])
  })

  test('toArray', () => {
    expect(toArray('hello')).toStrictEqual(['hello'])
    expect(toArray(['hello', 'world'])).toStrictEqual(['hello', 'world'])
  })

  test('removeFromArray', () => {
    expect(removeFromArray([1, 2, 3], [2])).toStrictEqual([1, 3])
    expect(removeFromArray([1, 2, 3], [2, 3, 4])).toStrictEqual([1])
  })

  test('removeIfMatchPattern', () => {
    expect(
      removeIfMatchPattern(
        ['/hello', '/world', '/something'],
        ['/hello*', '/som*']
      )
    ).toStrictEqual(['/world'])
  })
})
