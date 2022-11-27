import { Options, SummaryMetrics } from '../../../types'
import { filter } from '../filter'

const metrics: SummaryMetrics = {
  averageDays: 1,
  dirtyPackages: 2,
  percentage: 30,
  totalDays: 14,
  totalPackages: 55
}

const defaultOptions: Options<SummaryMetrics> = {
  averageDays: false,
  dirtyPackages: false,
  percentage: false,
  totalDays: false,
  totalPackages: false
}

interface TestCase {
  options: Options<SummaryMetrics>
  expected: Partial<SummaryMetrics>
}

const testCases: TestCase[] = [
  {
    options: defaultOptions,
    expected: {}
  },
  {
    options: { ...defaultOptions, averageDays: true, dirtyPackages: true },
    expected: { averageDays: 1, dirtyPackages: 2 }
  },
  {
    options: { ...defaultOptions, dirtyPackages: true, percentage: true },
    expected: { dirtyPackages: 2, percentage: 30 }
  },
  {
    options: { ...defaultOptions, percentage: true, totalDays: true },
    expected: { percentage: 30, totalDays: 14 }
  },
  {
    options: { ...defaultOptions, totalDays: true, totalPackages: true },
    expected: { totalDays: 14, totalPackages: 55 }
  }
]

describe('filter', () => {
  test.each(testCases)('filters metrics according to options #%#', ({ options, expected }) => {
    const actual = filter(metrics, options)

    expect(actual).toEqual(expected)
  })
})
