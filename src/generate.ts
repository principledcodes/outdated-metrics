import Progress from 'cli-progress'
import { BaseOptions } from './cli'
import { MetricsService, NpmService, ReportService } from './services'
import { Metrics, PackageContents } from './types'

export const generate = async (
  contents: PackageContents,
  options: BaseOptions
): Promise<any> => {
  const {
    devOnly,
    excludeDev,
    maxDate
  } = options

  const {
    dependencies,
    devDependencies,
    versions: allVersions
  } = contents

  let deps = [...dependencies, ...devDependencies]

  if (devOnly) { deps = devDependencies }
  if (excludeDev) { deps = dependencies }

  const metrics: Metrics = {}

  const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
  bar.start(deps.length, 0)

  for await (const dependency of deps) {
    const versions = await NpmService.versions(dependency)

    if (versions != null) {
      const result = MetricsService.calculate({
        maxDate: maxDate == null ? new Date() : new Date(maxDate),
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
