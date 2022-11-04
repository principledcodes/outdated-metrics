import fetch from 'isomorphic-fetch'
import { Loader } from '../../types'

export const url: Loader = async url => {
  const response = await fetch(url)
  const data = await response.json()

  const { dependencies, devDependencies } = data

  return {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
    versions: { ...dependencies, ...devDependencies }
  }
}
