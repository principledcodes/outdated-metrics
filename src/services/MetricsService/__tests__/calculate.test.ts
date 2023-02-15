import { DependencyMetric, Versions } from '../../../types'
import { calculate } from '../calculate'

const maxDate = new Date(2022, 11, 1)
const versions: Versions = {
  '2.15.0': new Date(2022, 10, 1),
  '2.15.1': new Date(2022, 10, 2),
  '2.15.2': new Date(2022, 10, 3),
  '2.15.3': new Date(2022, 10, 4)
}

describe('calculate', () => {
  test.each([
    { version: 'file:.../abc/package', versions },
    { version: '2.16.0', versions },
    { version: '2.15.2', versions: {} }
  ])('throws an error when cannot find release date of the current version #$#',
    ({ version, versions }) => {
      const error = new Error(`failed to get release date for the version: ${version}`)

      expect(() => calculate({ maxDate, version, versions })).toThrow(error)
    })

  test('returns up to date when current version is the latest version', () => {
    const version = '^2.15.3'

    const expected: DependencyMetric = { days: 0, releasesAvailable: 0 }
    const actual = calculate({ maxDate, version, versions })

    expect(actual).toEqual(expected)
  })

  test('returns amount of days since the latest version released', () => {
    const version = '^2.15.1'

    const expected: DependencyMetric = { days: 28, releasesAvailable: 2 }
    const actual = calculate({ maxDate, version, versions })

    expect(actual).toEqual(expected)
  })
})
