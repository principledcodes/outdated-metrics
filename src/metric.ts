import { daysSince } from './daysSince'
import { Versions } from './npmVersions'

interface DependencyMetric {
  /** the name of the dependency */
  dependency: string
  /** number of days since the next version was released */
  days: number
  /** total number of new releases since current package.json version */
  total: number
}

type Metric = (props: {
  dependency: string
  versions: Versions
  version: string
}) => DependencyMetric

export const metric: Metric = ({ dependency, version, versions }) => {
  const upToDate = {
    dependency,
    days: 0,
    total: 0
  }
  const releaseDates = Object.values(versions)
  const selectedVersion = version.replace(/[^\d.-]/g, '')
  const released = versions[selectedVersion]

  // const testDate = new Date('2017-01-20T04:54:42.976Z')
  const latestReleases = releaseDates
    .filter(rd => rd > released)
    .sort((a: Date, b: Date) => a.getTime() - b.getTime())

  if (latestReleases.length === 0) return upToDate

  return {
    dependency,
    days: daysSince(latestReleases[0]),
    total: latestReleases.length
  }
}
