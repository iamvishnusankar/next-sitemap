import { toChunks } from '.'

describe('next-sitemap/array', () => {
  test('toChunks', () => {
    const inputArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chunkSize = 3

    const chunks = toChunks(inputArray, chunkSize)

    expect(chunks).toMatchSnapshot()
    expect(chunks.length).toBe(Math.ceil(inputArray.length / chunkSize))
  })
})
