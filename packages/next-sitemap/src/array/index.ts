export const toChunks = <T>(arr: T[], chunkSize: number): any => {
  return arr.reduce<Array<T[]>>(
    (prev, _, i) =>
      i % chunkSize ? prev : [...prev, arr.slice(i, i + chunkSize)],
    []
  )
}

/**
 * simple method to normalize any string to array
 * @param inp
 */
export const toArray = (inp: string | string[]): string[] => {
  return typeof inp === 'string' ? [inp] : inp
}

/**
 * Returns the difference between two arrays
 * @param inputArr input array
 * @param toRemoveArr array of elements to be removed
 */
export const removeFromArray = <T>(inputArr: T[], toRemoveArr: T[]): T[] => {
  return inputArr.filter((x) => !toRemoveArr.includes(x))
}

/**
 * Returns the difference between two arrays
 * @param inputArr input array
 * @param toRemoveArr array of elements to be removed
 */
export const removeIfMatchPattern = <T>(
  inputArr: T[],
  toRemoveArr: T[]
): T[] => {
  return inputArr.filter((x) => !toRemoveArr.includes(x))
}
