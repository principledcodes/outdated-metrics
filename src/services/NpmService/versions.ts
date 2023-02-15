import fetch from 'isomorphic-fetch'
import { extractVersions } from './extractVersions'
import { Versions } from '../../types'

export const versions = async (dependency: string): Promise<Versions> => {
  const url = `https://registry.npmjs.org/${dependency}`

  const response = await fetch(url)
  const { time } = await response.json()
  const { created, modified, ...versions } = time

  return extractVersions(versions)
}
