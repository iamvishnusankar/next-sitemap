export const toChunks = <T>(arr: T[], chunkSize: number) => {
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
export const toArray = (inp: string | string[]) => {
  return typeof inp === 'string' ? [inp] : inp
}
