import { Metrics, SummaryMetrics } from '../../types'

export const summary = (metrics: Metrics): SummaryMetrics => {
  const values = Object.values(metrics)

  const totalPackages = values.length
  let totalDays = 0
  let dirtyPackages = 0

  values.forEach(value => {
    totalDays += value.days
    if (value.days > 0) dirtyPackages += 1
  })

  const percentage = Math.round((dirtyPackages / totalPackages) * 10000) / 100

  return {
    averageDays: dirtyPackages > 0 ? Math.round(totalDays / dirtyPackages) : 0,
    dirtyPackages,
    percentage,
    totalDays,
    totalPackages
  }
}
