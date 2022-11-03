import { BaseOptions } from './options'

const checkMaxDate = (maxDate: string | null): boolean => {
  if (maxDate == null) return true

  const maxDateEpoch = Date.parse(maxDate)

  if (isNaN(maxDateEpoch)) {
    throw new Error(`Provided date '${maxDate}' is not valid. ` +
      'Please enter date in YYYY-MM-DD format.')
  }

  return true
}

export const check = (options: BaseOptions): boolean => {
  const { maxDate } = options

  return checkMaxDate(maxDate)
}
