/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { IRobotPolicy } from '../../interface.js'
import { toArray } from '../../utils/array.js'

export const normalizePolicy = (policies: IRobotPolicy[]): IRobotPolicy[] => {
  return policies.map<IRobotPolicy>((x) => ({
    ...x,
    allow: toArray(x.allow!),
    disallow: toArray(x.disallow!),
  }))
}

export const addPolicies = (key: string, rules: string[]): string => {
  return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '')
}
