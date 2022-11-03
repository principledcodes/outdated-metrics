import type { Arguments, CommandBuilder } from 'yargs'
import { BaseOptions } from '../cli/options'
import { generate } from '../generate'
import { LoadService } from '../services'

interface Options extends BaseOptions {
  uri: string
}

export const command: string = 'url <uri>'
export const desc: string = 'metrics on outdated packages from a url'

export const builder: CommandBuilder<Options, Options> = yargs =>
  yargs
    .options({
      uri: { type: 'string' }
    })
    .positional('uri', { type: 'string', demandOption: true })

export const handler = async (options: Arguments<Options>): Promise<void> => {
  const { uri } = options
  const data = await LoadService.url(uri)

  await generate(data, options)
  process.exit(0)
}
