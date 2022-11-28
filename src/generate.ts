import consola from 'consola'
import { BaseOptions } from './cli/options'
import { ProgressBar } from './lib/progressBar'
import { MetricsService, NpmService, ReportService } from './services'
import { Metrics, PackageContents } from './types'

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
    versions: allVersions
  } = contents

  let deps = [...dependencies, ...devDependencies]

  if (devOnly) deps = devDependencies
  if (excludeDev) deps = dependencies

  const maxDate = maxDateInput == null ? new Date() : new Date(maxDateInput)

  if (maxDateInput != null) {
    consola.info(`Filtering out releases that occur after ${maxDateInput}`)
  }

  const metrics: Metrics = {}

  const bar = new ProgressBar(silent)
  bar.start(deps.length, 0)

  for await (const dependency of deps) {
    const versions = await NpmService.versions(dependency)

    if (versions != null) {
      const result = MetricsService.calculate({
        maxDate,
        version: allVersions[dependency],
        versions
      })

      metrics[dependency] = result
    }

    bar.increment()
  }

  bar.stop()

  const summary = MetricsService.summary(metrics)

  consola.success('Report ready!')
  consola.info(ReportService.format(summary, options))
}
