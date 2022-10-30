import { SummaryMetrics } from '../../types'

type Columnar = (metrics: Partial<SummaryMetrics>) => string

export const columnar: Columnar = metrics => Object.values(metrics).join(' ')
