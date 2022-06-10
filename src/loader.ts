import p from 'path'
import { readFile } from 'fs/promises'
import type { Options } from './types'

let dict: Set<string> = new Set()

export async function loadDict(options: Options) {
  if (dict.size)
    return dict

  const { customDict } = options
  try {
    if (!customDict) {
      const Words = (await import('impolite-word')).default
      dict = new Set(Words)
    }
    if (Array.isArray(customDict)) { dict = new Set(customDict) }

    else if (typeof customDict === 'object') {
      const { path } = customDict
      const content = (await readFile(p.resolve(path))).toString()
      dict = new Set<string>(JSON.parse(content))
    }
  }
  catch (error) {
    // logger
    console.error(error)
  }
  return dict
}
