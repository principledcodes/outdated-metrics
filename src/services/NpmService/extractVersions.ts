import { Versions } from '../../types'

export const extractVersions = (versions: Record<string, string>): Versions => {
  const filter = /-alpha|-beta|-dev/
  const filtered = Object.entries(versions).filter(([key]) => !filter.test(key))

  return Object.fromEntries(filtered.map(([key, value]) => [key, new Date(value)]))
}
