export type Versions = Record<string, Date>

const extractVersions = (versions: Record<string, string>): Versions => {
  const filter = /-alpha|-beta|-dev/
  const filtered = Object.entries(versions).filter(([key]) => !filter.test(key))

  return Object.fromEntries(filtered.map(([key, value]) => [key, new Date(value)]))
}

export const npmVersions = async (dependency: string): Promise<Versions | undefined> => {
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
