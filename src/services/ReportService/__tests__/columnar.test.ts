import { SummaryMetrics } from "../../../types"
import { columnar } from "../columnar"

describe('columnar formatter', () => {
  test('outputs metrics summary in column format', () => {
    const metrics: Partial<SummaryMetrics> = {
      averageDays: 13,
      totalDays: 7,
    }
    const actual = columnar(metrics)

    expect(actual).toBe('13 7')
  })
})