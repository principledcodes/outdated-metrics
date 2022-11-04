import { BaseOptions } from '../options'
import { check } from '../check'

const options: BaseOptions = {
  averageDays: true,
  devOnly: false,
  dirtyPackages: false,
  excludeDev: false,
  format: 'json',
  location: '',
  maxDate: null,
  percentage: false,
  silent: false,
  totalDays: false,
  totalPackages: false
}

describe('CLI args check', () => {
  test('throws an error when maxDate value is not a valid date', () => {
    expect(() => {
      check({ ...options, maxDate: 'abc' })
    }).toThrow(/date 'abc' is not valid/)
  })

  test.each([
    options,
    { ...options, maxDate: '2000-01-19' }
  ])('returns true when all arguments have valid values #%#', opts => {
    expect(check(opts)).toBe(true)
  })
})
