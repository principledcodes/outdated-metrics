import { Options, SummaryMetrics } from '../../types'

type Filter = (
  metrics: SummaryMetrics,
  options: Options<SummaryMetrics>
) => Partial<SummaryMetrics>

export const filter: Filter = (metrics, options) => {
  const {
    averageDays,
    dirtyPackages,
    percentage,
    totalDays,
    totalPackages
  } = metrics

  const filtered: Partial<SummaryMetrics> = {}

  if (options.averageDays) filtered.averageDays = averageDays
  if (options.dirtyPackages) filtered.dirtyPackages = dirtyPackages
  if (options.percentage) filtered.percentage = percentage
  if (options.totalDays) filtered.totalDays = totalDays
  if (options.totalPackages) filtered.totalPackages = totalPackages

  return filtered
}

// Object.entries(options)
// .filter(([key, val]) => val)
// .reduce((acc, [key]) => {
//   acc[key] = metrics[key]
//   return acc
// }, {})
