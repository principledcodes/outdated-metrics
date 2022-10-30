import { daysSince } from '../daysSince'

describe('daysSince', () => {
  test.each([0, 10, 500])('determines %i days ago', (duration) => {
    const today = new Date()
    const tenDaysAgo = new Date()

    tenDaysAgo.setDate(today.getDate() - duration)

    expect(daysSince(tenDaysAgo)).toEqual(duration)
  })
})
