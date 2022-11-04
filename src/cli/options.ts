export interface BaseOptions {
  [x: string]: unknown
  averageDays: boolean
  devOnly: boolean
  dirtyPackages: boolean
  excludeDev: boolean
  format: string
  location: string
  maxDate: string | null
  percentage: boolean
  silent: boolean
  totalDays: boolean
  totalPackages: boolean
}
