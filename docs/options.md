# Command line options

- [averageDays](#averageDays)
- [devOnly](#devOnly)
- [dirtyPackages](#dirtyPackages)
- [excludeDev](#excludeDev)
- [format](#format)
- [percentage](#percentage)
- [totalDays](#totalDays)
- [totalPackages](#totalPackages)

## format

Specification     | Description
------------------|--------------------
Option            | --format
Type              | string
Default           | json
Available options | json, column

The output format for the generated metrics.

- json (default): Format the output metrics as JSON.
- column: Out put the metrics as a space separated string.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --format column
```

## devOnly

Specification | Description
--------------|--------------------
Option        | --devOnly, --dev-only
Type          | boolean
Default       | false

Only include devDependencies when calulating metrics for package.json.
When excludeDev is specified, deOnly is ignored.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --devOnly
```

## excludeDev

Specification | Description
--------------|--------------------
Option        | --excludeDev, --exclude-dev
Type          | boolean
Default       | false

Excludes devDependencies from metrics calculation. Effectively, this is runtime
dependencies only.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --excludeDev
```

## averageDays

Specification | Description
--------------|--------------------
Option        | --averageDays, --average-days
Type          | boolean
Default       | false

Include in the output the average number of days that new versions for outdated
packages have been available.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --averageDays
```

## dirtyPackages

Specification | Description
--------------|--------------------
Option        | --dirtyPackages, --dirty-packages
Type          | boolean
Default       | false

Include in the output the total number of out of date packages.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --dirtyPackages
```

## maxDate

Specification | Description
--------------|--------------------
Option        | --maxDate, --max-date
Type          | string (yyyy-mm-dd)
Default       | undefined

Constrain the calculation of metrics by filtering out releases that occur after
maxDate

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --maxDate 2022-09-30
```

## percentage

Specification | Description
--------------|--------------------
Option        | --percentage
Type          | boolean
Default       | false

Include in the output the percentage of out of date packages in relation to up
to date packages. Formatted to 2 decimal places.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --percentage
```

## totalDays

Specification | Description
--------------|--------------------
Option        | --totalDays, --total-days
Type          | boolean
Default       | false

Output the total number of days that new packages have been available.

#### Examples

```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --totalDays
```

## totalPackages

Specification | Description
--------------|--------------------
Option        | --totalPackages, --total-packages
Type          | boolean
Default       | false

Output the total number of packages defined in package.json.

#### Examples


```bash
outdated-metrics \
  url https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json \
  --totalPackages
```
