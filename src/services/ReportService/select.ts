import { BaseOptions } from '../../cli'
import { SummaryMetrics } from '../../types'
import { columnar } from './columnar'
import { filter } from './filter'
import { json } from './json'

type Select = (
  metrics: SummaryMetrics,
  options: BaseOptions
) => string

export const select: Select = (metrics, options) => {
  const { format } = options
  const requested = filter(metrics, options)

  return format === 'column' ? columnar(requested) : json(requested)
}
