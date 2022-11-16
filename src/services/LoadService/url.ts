import fetch from 'isomorphic-fetch'
import { pkgContent } from './pkgContent'
import { Loader } from '../../types'

export const url: Loader = async url => {
  const response = await fetch(url)
  const data = await response.json()

  return pkgContent(data)
}
