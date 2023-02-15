import { MetricsService } from '../MetricsService'
import { DependencyMetric, Versions } from '../../types'

type DependencyMetrics = (args: {
  currentVersion: string
  maxDate: Date
}) => (versions?: Versions) => DependencyMetric | undefined

export const dependencyMetrics: DependencyMetrics = ({ currentVersion, maxDate }) =>
  (versions?: Versions) => {
    if (versions == null) return

    return MetricsService.calculate({
      maxDate,
      version: currentVersion,
      versions
    })
  }
