import type { Arguments, CommandBuilder } from 'yargs'
import { BaseOptions } from '../cli/options'
import { generate } from '../generate'
import { LoadService } from '../services'

interface Options extends BaseOptions {
  filename: string
}

export const command: string = 'file <filename>'
export const desc: string = 'metrics on outdated packages from a file'

export const builder: CommandBuilder<Options, Options> = yargs =>
  yargs
    .options({
      filename: { type: 'string' }
    })
    .positional('filename', { type: 'string', demandOption: true })

export const handler = async (options: Arguments<Options>): Promise<void> => {
  const { filename } = options
  const data = await LoadService.file(filename)

  await generate(data, options)

  process.exit(0)
}
