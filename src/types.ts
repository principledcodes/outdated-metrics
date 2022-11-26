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

/** function that loads a package.json from from a location */
export type Loader = (location: string) => Promise<PackageContents>

export type Versions = Record<string, Date>

export interface SummaryMetrics {
  averageDays: number
  dirtyPackages: number
  percentage: number
  totalDays: number
  totalPackages: number
}

export type Options<Type> = {
  [Property in keyof Type]: boolean
}