import { PackageContents } from '../../../types'
import { url } from '../url'

describe('url', () => {
  const uri = 'https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json'
  let response: PackageContents

  beforeAll(async () => {
    response = await url.load(uri)
  })

  test('has devDependencies', () => {
    const { devDependencies } = response

    expect(devDependencies).toContain('jest')
  })

  test('has dependencies', () => {
    const { dependencies } = response

    expect(dependencies).toContain('yargs')
  })

  test('has versions', () => {
    const { versions } = response

    expect(versions.jest).toBeDefined()
  })
})
