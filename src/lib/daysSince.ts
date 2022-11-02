const day = 24 * 60 * 60 * 1000 // one day in milliseconds

export const daysSince = (date: Date, maxDate: Date): number =>
  Math.round(Math.abs(maxDate.getTime() - date.getTime()) / day)
