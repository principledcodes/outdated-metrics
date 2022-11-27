import { Formatter, Options, SummaryMetrics } from '../../types'
import { columnar } from './columnar'
import { filter } from './filter'
import { json } from './json'

const fmt = (output: string): Formatter => output === 'column' ? columnar : json

type Format = (
  metrics: SummaryMetrics,
  options: Options<SummaryMetrics> & { format: string }
) => string

export const format: Format = (metrics, options) => {
  const report = filter(metrics, options)

  return fmt(options.format)(report)
}
