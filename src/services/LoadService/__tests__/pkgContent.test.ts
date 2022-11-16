import { PackageContents } from '../../../types'
import { pkgContent } from '../pkgContent'

interface TestCase {
  data: any
  expected: PackageContents
}

const testCases: TestCase[] = [
  {
    data: {
      dependencies: {
        'isomorphic-fetch': '^3.0.0',
        yargs: '^17.6.2'
      },
      devDependencies: {
        '@types/jest': '^29.2.3',
        jest: '^29.3.1'
      },
    },
    expected: {
      dependencies: ['isomorphic-fetch', 'yargs'],
      devDependencies: ['@types/jest', 'jest'],
      versions: {
        'isomorphic-fetch': '^3.0.0',
        yargs: '^17.6.2',
        '@types/jest': '^29.2.3',
        jest: '^29.3.1'
      }
    }
  },
  // prod deps only
  {
    data: {
      dependencies: {
        'isomorphic-fetch': '^3.0.0',
        yargs: '^17.6.2'
      },
    },
    expected: {
      dependencies: ['isomorphic-fetch', 'yargs'],
      devDependencies: [],
      versions: {
        'isomorphic-fetch': '^3.0.0',
        yargs: '^17.6.2',
      }
    }
  },
  // devDeps only
  {
    data: {
      devDependencies: {
        '@types/jest': '^29.2.3',
        jest: '^29.3.1'
      },
    },
    expected: {
      dependencies: [],
      devDependencies: ['@types/jest', 'jest'],
      versions: {
        '@types/jest': '^29.2.3',
        jest: '^29.3.1'
      }
    }
  },
  // no deps
  {
    data: {
      dependencies: {},
      devDependencies: {},
    },
    expected: {
      dependencies: [],
      devDependencies: [],
      versions: {}
    }
  },
  {
    data: {
      devDependencies: {},
    },
    expected: {
      dependencies: [],
      devDependencies: [],
      versions: {}
    }
  },
  {
    data: {
      dependencies: {},
    },
    expected: {
      dependencies: [],
      devDependencies: [],
      versions: {}
    }
  },
  {
    data: {},
    expected: {
      dependencies: [],
      devDependencies: [],
      versions: {}
    }
  },
]

describe('pkgContent', () => {
  test.each(testCases)('produces package contents #%#', ({ data, expected }) => {
    const actual = pkgContent(data)

    expect(actual).toEqual(expected)
  })
})