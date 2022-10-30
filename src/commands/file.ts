import type { Arguments, CommandBuilder } from 'yargs'
import { generate } from '../generate'
import { LoadService } from '../services'

interface Options {
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

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { filename } = argv
  const data = await LoadService.file(filename)

  await generate(data)

  process.exit(0)
}
