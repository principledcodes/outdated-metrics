import { Options, SummaryMetrics } from '../../types'
import { columnar } from './columnar'
import { filter } from './filter'
import { json } from './json'

type Select = (
  metrics: SummaryMetrics,
  options: Options<SummaryMetrics> & { format: string }
) => string

export const select: Select = (metrics, options) => {
  const { format } = options
  const requested = filter(metrics, options)

  return format === 'column' ? columnar(requested) : json(requested)
}
