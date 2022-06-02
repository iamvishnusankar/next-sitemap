import { merge } from '@corex/deepmerge'

export const overwriteMerge = <T>(...configs: Array<Partial<T>>): T => {
  return merge(configs, {
    arrayMergeType: 'overwrite',
  }) as T
}

export const combineMerge = <T>(...configs: Array<Partial<T>>): T => {
  return merge(configs, {
    arrayMergeType: 'combine',
  }) as T
}
