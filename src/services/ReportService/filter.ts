import { Options, SummaryMetrics } from '../../types'

type Filter = (
  metrics: SummaryMetrics,
  options: Options<SummaryMetrics>
) => Partial<SummaryMetrics>

export const filter: Filter = (metrics, options) => {
  const filtered: Partial<SummaryMetrics> = {}

  let key: keyof SummaryMetrics
  for (key in options) {
    if (options[key]) filtered[key] = metrics[key]
  }

  return filtered
}
