import type { Arguments, CommandBuilder } from 'yargs'
import { load } from '../load'

interface Options {
  file: string
}

export const command: string = 'parse <file>'
export const desc: string = 'parse package.json file'

export const builder: CommandBuilder<Options, Options> = yargs =>
  yargs
    .options({
      file: { type: 'string' }
    })
    .positional('file', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv
  await load(file)

  process.exit(0)
}
