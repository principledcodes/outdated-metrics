import { promises as fs } from 'fs'
import { Loader } from '../../types'
import { pkgContent } from './pkgContent'

export const file: Loader = async filename => {
  const data = await fs.readFile(filename, 'utf8')

  return pkgContent(JSON.parse(data))
}
