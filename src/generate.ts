import { BaseOptions } from './cli'
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

  if (devOnly) { deps = devDependencies }
  if (excludeDev) { deps = dependencies }

  let maxDate = new Date()

  // TODO: it should be moved to the input validation service/lib
  // See https://github.com/craigs/outdated-metrics/issues/17
  if (maxDateInput != null) {
    const maxDateEpoch = Date.parse(maxDateInput)

    if (isNaN(maxDateEpoch)) {
      throw new Error(`Provided date '${maxDateInput}' is not valid. ` +
        'Please enter date in YYYY-MM-DD format.')
    }

    process.stdout.write(`Filtering out releases that occur after ${maxDateInput}\n`)
    maxDate = new Date(maxDateEpoch)
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

  process.stdout.write(ReportService.select(summary, options))
}
