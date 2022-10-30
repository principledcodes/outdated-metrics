import { BaseOptions } from '../../cli'
import { SummaryMetrics } from '../../types'

type Filter = (
  metrics: SummaryMetrics,
  options: BaseOptions
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
