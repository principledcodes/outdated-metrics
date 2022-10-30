export interface DependencyMetric {
  /** number of days since the next version was released */
  days: number
  /** total number of new releases since current package.json version */
  releasesAvailable: number
}

export type Metrics = Record<string, DependencyMetric>

export interface PackageContents {
  /** dependencies from package.json */
  dependencies: string[]
  /** devDependencies from package.json */
  devDependencies: string[]
  /** versions set for each dependency */
  versions: Record<string, string>
}

export type Versions = Record<string, Date>

export interface SummaryMetrics {
  dirtyPackages: number
  totalDays: number
  totalPackages: number
  averageDays: number
  percentage: number
}
