import { promises as fs } from 'fs'

interface PackageContents {
  dependencies: string[]
  devDependencies: string[]
}

type PackageDependencies = (filename: string) => Promise<PackageContents>

export const packageDependencies: PackageDependencies = async filename => {
  const data = await fs.readFile(filename, 'utf8')
  const { dependencies, devDependencies } = JSON.parse(data)

  return {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies)
  }
}
