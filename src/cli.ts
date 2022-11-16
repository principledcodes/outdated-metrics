#!/usr/bin/env node

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { check } from './cli/check'
import { LoadService } from './services'
import { generate } from './generate'
import { BaseOptions } from './cli/options'

void yargs(hideBin(process.argv))
  // @ts-expect-error
  .command('$0 <location>', '', () => { }, async (options: BaseOptions) => {
    const { location } = options
    const data = await LoadService.load(location)

    await generate(data, options)

    process.exit(0)
  })
  .strict()
  .alias({ h: 'help' })
  .options({
    format: {
      default: 'json',
      description: 'output format',
      type: 'string',
      choices: ['json', 'column']
    },
    devOnly: {
      default: false,
      description: 'Only use devDependencies',
      type: 'boolean'
    },
    excludeDev: {
      default: false,
      type: 'boolean',
      description: 'Exclude development dependencies'
    },
    averageDays: {
      default: true,
      description: 'Include average number of days per package out of date',
      type: 'boolean'
    },
    dirtyPackages: {
      default: false,
      description: 'Include number of packages out of date',
      type: 'boolean'
    },
    maxDate: {
      default: null,
      description: 'Filter out releases that occur after maxDate. ' +
        'Should be in YYYY-MM-DD format.',
      type: 'string'
    },
    percentage: {
      default: false,
      description: 'Include percentage of packages out of date',
      type: 'boolean'
    },
    silent: {
      default: false,
      description: 'Hide progress bar',
      type: 'boolean'
    },
    totalDays: {
      default: false,
      description: 'Include total days out of date',
      type: 'boolean'
    },
    totalPackages: {
      default: false,
      description: 'Include total packages count',
      type: 'boolean'
    }
  })
  .positional('location', { type: 'string', demandOption: true })
  .check(check, true)
  .argv
