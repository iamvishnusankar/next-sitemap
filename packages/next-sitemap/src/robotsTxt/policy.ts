import { IRobotPolicy } from '../interface'
import { toArray } from '../array'

export const normalizePolicy = (policies: IRobotPolicy[]) => {
  return policies.map<IRobotPolicy>((x) => ({
    ...x,
    allow: toArray(x.allow!),
    disallow: toArray(x.disallow!)
  }))
}
