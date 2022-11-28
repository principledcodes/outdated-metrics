import { Formatter } from '../../types'

export const columnar: Formatter = metrics => Object.values(metrics).join(' ')
