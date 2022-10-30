const day = 24 * 60 * 60 * 1000 // one day in milliseconds

export const daysSince = (date: Date): number => {
  const today = new Date().getTime()

  return Math.round(Math.abs((today - date.getTime()) / day))
}
