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

  return {
    averageDays: totalDays / dirtyPackages,
    dirtyPackages,
    percentage: Math.round((dirtyPackages / totalPackages) * 100 / 100),
    totalDays,
    totalPackages
  }
}
