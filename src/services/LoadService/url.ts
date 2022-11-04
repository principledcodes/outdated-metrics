import fetch from 'isomorphic-fetch'
import { PackageContents } from '../../types'

type PackageDependencies = (url: string) => Promise<PackageContents>

export const url: PackageDependencies = async url => {
  const response = await fetch(url)
  const data = await response.json()

  const { dependencies, devDependencies } = data

  return {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
    versions: { ...dependencies, ...devDependencies }
  }
}
