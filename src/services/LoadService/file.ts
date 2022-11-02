import { promises as fs } from 'fs'
import { PackageContents } from '../../types'

type PackageDependencies = (filename: string) => Promise<PackageContents>

const load: PackageDependencies = async filename => {
  const data = await fs.readFile(filename, 'utf8')
  const { dependencies, devDependencies } = JSON.parse(data)

  return {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
    versions: { ...dependencies, ...devDependencies }
  }
}

export const file = {
  load
}