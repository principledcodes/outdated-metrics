import { BaseOptions } from '../../cli/options'
import { SummaryMetrics } from '../../types'
import { columnar } from './columnar'
import { filter } from './filter'
import { json } from './json'

type Select = (
  metrics: SummaryMetrics,
  options: BaseOptions // TODO: BaseOptions are CLI specific options, consider declaring FilterOptions
) => string

export const select: Select = (metrics, options) => {
  const { format } = options
  const requested = filter(metrics, options)

  return format === 'column' ? columnar(requested) : json(requested)
}
