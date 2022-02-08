/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IRobotPolicy } from '../../interface'
import { toArray } from '../../array'

export const normalizePolicy = (policies: IRobotPolicy[]): IRobotPolicy[] => {
  return policies.map<IRobotPolicy>((x) => ({
    ...x,
    allow: toArray(x.allow!),
    disallow: toArray(x.disallow!),
    cleanParam: toArray(x.cleanParam!)
  }))
}

export const addPolicies = (key: string, rules: string[]): string => {
  return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '')
}
