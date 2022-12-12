import { Dependency, DependencyMetric, Metrics } from '../../types'

export const metricsReducer = (dependencies: Dependency[]) =>
  (metrics: Metrics, dm: DependencyMetric | undefined, idx: number) => {
    if (dm != null) metrics[dependencies[idx].name] = dm
    return metrics
  }
