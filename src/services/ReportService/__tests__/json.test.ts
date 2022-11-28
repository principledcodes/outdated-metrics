import { SummaryMetrics } from '../../../types'
import { json } from '../json'

describe('json formatter', () => {
  test('outputs metrics summary in json format', () => {
    const metrics: Partial<SummaryMetrics> = {
      averageDays: 13,
      totalDays: 7
    }
    const actual = json(metrics)

    expect(actual).toBe('{"averageDays":13,"totalDays":7}')
  })
})
