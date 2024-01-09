import consola from 'consola'
import { BaseOptions } from './cli/options'
import { ProgressBar } from './lib/progressBar'
import { MetricsService, MetricsGeneratorService, ReportService } from './services'
import { Dependency, Metrics, PackageContents } from './types'
import { allSettled, isResolved } from '@principledcodes/promise-xray'

export const generate = async (
  contents: PackageContents,
  options: BaseOptions
): Promise<any> => {
  const {
    devOnly,
    excludeDev,
    maxDate: maxDateInput,
    silent
  } = options

  const {
    dependencies,
    devDependencies,
    versions: depsVersions // current version for each dependency
  } = contents

  let _deps = [...dependencies, ...devDependencies]

  if (devOnly) _deps = devDependencies
  if (excludeDev) _deps = dependencies

  // TODO: contents should output Dependency[]
  const deps: Dependency[] = _deps.map((dependencyName) => ({
    name: dependencyName,
    version: depsVersions[dependencyName]
  }))

  const maxDate = maxDateInput == null ? new Date() : new Date(maxDateInput)

  if (maxDateInput != null) {
    consola.info(`Filtering out releases that occur after ${maxDateInput}`)
  }

  const bar = new ProgressBar(silent)
  bar.start(deps.length, 0)

  const metricsTasks = MetricsGeneratorService.tasks({ deps, maxDate })

  const rawMetrics = (await allSettled(metricsTasks, bar))
    .filter(isResolved)
    .map(result => result.value)

  const metrics = rawMetrics.reduce<Metrics>(MetricsService.reducer(deps), {})

  bar.stop()

  const summary = MetricsService.summary(metrics)

  consola.success('Report ready!')
  consola.info(ReportService.format(summary, options))
}
