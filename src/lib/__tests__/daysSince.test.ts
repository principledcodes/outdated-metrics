import { daysSince } from '../daysSince'

describe('daysSince', () => {
  test.each([0, 10, 500])('determines %i days ago', duration => {
    const maxDays = 2
    const maxDate = new Date()
    const today = new Date()
    const tenDaysAgo = new Date()

    maxDate.setDate(today.getDate() - maxDays)
    tenDaysAgo.setDate(today.getDate() - duration)

    expect(daysSince(tenDaysAgo, maxDate))
      .toEqual(Math.abs(duration - maxDays))
  })
})
