import { file } from '../file'

describe('file', () => {
  test('has devDependencies', async () => {
    const { devDependencies } = await file.load('package.json')

    expect(devDependencies).toContain('jest')
  })

  test('has dependencies', async () => {
    const { dependencies } = await file.load('package.json')

    expect(dependencies).toContain('yargs')
  })

  test('has versions', async () => {
    const { versions } = await file.load('package.json')

    expect(versions.jest).toBeDefined()
  })
})
