#!/usr/bin/env node --experimental-fetch

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

export interface BaseOptions {
  averageDays: boolean
  devOnly: boolean
  dirtyPackages: boolean
  excludeDev: boolean
  format: string
  maxDate: string
  percentage: boolean
  totalDays: boolean
  totalPackages: boolean
}

void yargs(hideBin(process.argv))
  .commandDir('commands')
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
      default: undefined,
      description: 'Include number of packages out of date',
      type: 'string'
    },
    percentage: {
      default: false,
      description: 'Include percentage of packages out of date',
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
  .argv
