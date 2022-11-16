import { PackageContents } from '../../types'
import { file } from './file'
import { url } from './url'

export const load = async (location: string): Promise<PackageContents> => {
  const loader = location.startsWith('http') ? url : file
  return await loader(location)
}
