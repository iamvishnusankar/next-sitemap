export const toChunks = <T>(arr: T[], chunkSize: number) => {
  return arr.reduce<Array<T[]>>(
    (prev, _, i) => (i % chunkSize ? prev : [...prev, arr.slice(i, i + chunkSize)]),
    []
  )
}
