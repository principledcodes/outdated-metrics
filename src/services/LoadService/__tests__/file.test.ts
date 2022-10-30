import { file } from '../file'

describe('file', () => {
  test('has devDependencies', async () => {
    const { devDependencies } = await file('package.json')

    expect(devDependencies).toContain('jest')
  })

  test('has dependencies', async () => {
    const { dependencies } = await file('package.json')

    expect(dependencies).toContain('yargs')
  })

  test('has versions', async () => {
    const { versions } = await file('package.json')

    expect(versions.jest).toBeDefined()
  })
})
