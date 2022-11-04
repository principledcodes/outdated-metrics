# Usage

```bash
outdated-metrics <location> options
```

Where location can be a file or web url. Available options are [listed here](options.md)

#### Examples

Generate metrics from a local file.

```bash
outdated-metrics ./package.json
```

Generate metrics from a package.json from a URL resource

```bash
outdated-metrics \
  https://raw.githubusercontent.com/craigs/outdated-metrics/main/package.json
```
