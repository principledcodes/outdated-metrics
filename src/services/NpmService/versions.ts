import fetch from 'isomorphic-fetch'
import { extractVersions } from './extractVersions'
import { Versions } from '../../types'

export const versions = async (dependency: string): Promise<Versions | undefined> => {
  const url = `https://registry.npmjs.org/${dependency}`

  try {
    const response = await fetch(url)
    const { time } = await response.json()
    const { created, modified, ...versions } = time

    return extractVersions(versions)
  } catch (error) {
    console.log('// ERROR')
    console.log(error)
  }
}
