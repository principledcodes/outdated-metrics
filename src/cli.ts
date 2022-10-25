#!/usr/bin/env node --experimental-fetch

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

void yargs(hideBin(process.argv))
  .commandDir('commands')
  .strict()
  .alias({ h: 'help' })
  .argv
