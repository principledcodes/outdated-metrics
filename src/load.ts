import { packageDependencies } from './packageDependencies'

const packageVersions = async (dependency: string): Promise<string[]> => {
  const url = `https://registry.npmjs.org/${dependency}`

  try {
    console.log('-- start fetch call --')
    const response = await fetch(url)
    console.log('-- fetch completed --')
    const data = await response.json()
    console.log({ data })
  } catch (error) {
    console.log('// ERROR')
    console.log(error)
  }

  return [dependency]
}

export const load = async (filename: string): Promise<any> => {
  const { devDependencies } = await packageDependencies(filename)

  for await (const dependency of devDependencies) {
    const result = await packageVersions(dependency)
    console.log('-- result received --')
    console.log(result)
  }
}
