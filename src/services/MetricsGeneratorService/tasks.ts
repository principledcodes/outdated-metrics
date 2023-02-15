import { dependencyMetrics } from './dependencyMetrics'
import { NpmService } from '../NpmService'
import { Dependency, DependencyMetric } from '../../types'

type Tasks = (args: {
  deps: Dependency[]
  maxDate: Date
}) => Array<Promise<DependencyMetric | undefined>>

export const tasks: Tasks = ({ deps, maxDate }) =>
  // the aim of the following map is to build unresolved promise chain,
  // the result promise collection will be resolved by the caller
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  deps.map(({ name, version }) =>
    NpmService.versions(name)
      .then(dependencyMetrics({ currentVersion: version, maxDate }))
  )
