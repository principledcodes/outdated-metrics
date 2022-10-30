import Progress from 'cli-progress'
import { MetricsService, NpmService, ReportService } from './services'
import { Metrics, PackageContents } from './types'

export const generate = async (contents: PackageContents): Promise<any> => {
  const {
    dependencies,
    devDependencies,
    versions: allVersions
  } = contents

  const allDependencies = [...dependencies, ...devDependencies]

  const metrics: Metrics = {}

  process.stdout.write('\n')

  const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
  bar.start(allDependencies.length, 0)

  for await (const dependency of allDependencies) {
    const versions = await NpmService.versions(dependency)

    if (versions != null) {
      const result = MetricsService.calculate({
        dependency,
        version: allVersions[dependency],
        versions
      })

      metrics[dependency] = result
    }

    bar.increment()
  }

  bar.stop()

  const summary = MetricsService.summary(metrics)

  process.stdout.write('\n')

  console.log(ReportService.json(summary))
}
