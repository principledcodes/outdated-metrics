import { SummaryMetrics } from '../../types'

type Json = (metrics: Partial<SummaryMetrics>) => string

export const json: Json = metrics => JSON.stringify(metrics)
