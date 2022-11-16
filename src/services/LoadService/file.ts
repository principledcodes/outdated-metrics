import { promises as fs } from 'fs'
import { pkgContent } from './pkgContent'
import { Loader } from '../../types'

export const file: Loader = async filename => {
  const data = await fs.readFile(filename, 'utf8')

  return pkgContent(JSON.parse(data))
}
