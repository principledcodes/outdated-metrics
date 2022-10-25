import { packageDependencies } from '..'

describe('packageDependencies', () => {
  test('has devDependencies', async () => {
    const { devDependencies } = await packageDependencies('package.json')

    expect(devDependencies).toContain('jest')
  })

  test('has dependencies', async () => {
    const { dependencies } = await packageDependencies('package.json')

    expect(dependencies).toContain('yargs')
  })

  test('has versions', async () => {
    const { versions } = await packageDependencies('package.json')

    expect(versions.jest).toBeDefined()
  })
})
