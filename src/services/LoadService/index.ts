import { file } from './file'
import { url } from './url'

export interface PackageLoader {
  load(location: string): Promise<PackageContents>
}

export const PackageLoaders = {
  file,
  url
}
