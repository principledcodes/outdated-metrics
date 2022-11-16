import { PackageContents } from '../../types'

export const pkgContent = (data: any): PackageContents => {
  const { dependencies = {}, devDependencies = {} } = data

  return {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
    versions: { ...dependencies, ...devDependencies }
  }
}
