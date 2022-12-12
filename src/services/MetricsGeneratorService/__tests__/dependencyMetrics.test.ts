import { DependencyMetric, Versions } from '../../../types'
import { dependencyMetrics } from '../dependencyMetrics'

describe('dependencyMetrics', () => {
  test('produces function that calculates dependency metrics', () => {
    const maxDate = new Date(2022, 2, 1) // 01 Mar 2022
    const currentVersion = '0.1.0'

    const metricsCalculator = dependencyMetrics({ currentVersion, maxDate })

    let dm = metricsCalculator()
    expect(dm).toBeUndefined()

    const versions: Versions = {
      '0.2.0': new Date(2022, 1, 2), // 02 Feb 2022
      '0.1.0': new Date(2022, 0, 1) // 01 Jan 2022
    }

    const expectedDM: DependencyMetric = {
      days: 27,
      releasesAvailable: 1
    }

    dm = metricsCalculator(versions)
    expect(dm).toEqual(expectedDM)
  })
})
