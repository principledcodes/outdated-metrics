import { promises as fs } from 'fs'
import { Loader } from '../../types'

export const file: Loader = async filename => {
  const data = await fs.readFile(filename, 'utf8')
  const { dependencies, devDependencies } = JSON.parse(data)

  return {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
    versions: { ...dependencies, ...devDependencies }
  }
}
