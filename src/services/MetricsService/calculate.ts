import { daysSince } from '../../lib/daysSince'
import type { DependencyMetric, Versions } from '../../types'

type Calculate = (props: {
  dependency: string
  versions: Versions
  version: string
}) => DependencyMetric

const upToDate = { days: 0, releasesAvailable: 0 }

export const calculate: Calculate = ({ dependency, version, versions }) => {
  const releaseDates = Object.values(versions)
  const selectedVersion = version.replace(/[^\d.-]/g, '')
  const released = versions[selectedVersion]

  const latestReleases = releaseDates
    .filter(rd => rd > released)
    .sort((a: Date, b: Date) => a.getTime() - b.getTime())

  if (latestReleases.length === 0) return upToDate

  return {
    days: daysSince(latestReleases[0]),
    releasesAvailable: latestReleases.length
  }
}
