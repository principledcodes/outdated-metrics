import fetch from 'isomorphic-fetch'
import { Loader } from '../../types'
import { pkgContent } from './pkgContent'

export const url: Loader = async url => {
  const response = await fetch(url)
  const data = await response.json()

  return pkgContent(data)
}
