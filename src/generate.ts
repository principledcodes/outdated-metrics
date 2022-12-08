import consola from 'consola'
import { BaseOptions } from './cli/options'
import { ProgressBar } from './lib/progressBar'
import { MetricsService, NpmService, ReportService } from './services'
import { DependencyMetric, Metrics, PackageContents, Versions } from './types'
import { all } from '@elevatepartners/promise-xray'

const getDependencyMetrics = (currentVersion: string, maxDate: Date) =>
  (versions?: Versions) => {
    if (!versions) return

    return MetricsService.calculate({
      maxDate,
      version: currentVersion,
      versions
    })
  }

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

  let deps = [...dependencies, ...devDependencies]

  if (devOnly) deps = devDependencies
  if (excludeDev) deps = dependencies

  const maxDate = maxDateInput == null ? new Date() : new Date(maxDateInput)

  if (maxDateInput != null) {
    consola.info(`Filtering out releases that occur after ${maxDateInput}`)
  }

  const bar = new ProgressBar(silent)
  bar.start(deps.length, 0)

  const promisedMetrics = deps.map((dependency) =>
    NpmService.versions(dependency)
      .then(getDependencyMetrics(depsVersions[dependency], maxDate))
  )

  const rawMetrics = await all(promisedMetrics, bar)

  const metrics = rawMetrics.reduce<Metrics>((acc, dm, idx) => {
    if (dm != null) acc[deps[idx]] = dm
    return acc
  }, {})

  bar.stop()

  const summary = MetricsService.summary(metrics)

  consola.success('Report ready!')
  consola.info(ReportService.format(summary, options))
}
