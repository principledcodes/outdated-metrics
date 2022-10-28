import { metric } from './metric'
import { npmVersions } from './npmVersions'
import { packageDependencies } from './packageDependencies'

export const load = async (filename: string): Promise<any> => {
  const {
    dependencies,
    devDependencies,
    versions: allVersions
  } = await packageDependencies(filename)

  const allDependencies = [...dependencies, ...devDependencies]

  for await (const dependency of allDependencies) {
    const versions = await npmVersions(dependency)

    if (versions != null) {
      console.log(
        metric({
          dependency,
          version: allVersions[dependency],
          versions
        })
      )
    }
  }
}
