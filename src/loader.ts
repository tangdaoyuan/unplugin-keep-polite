import p from 'path'
import { readFile } from 'fs/promises'
import { createRequire } from 'node:module'
import type { Options } from './types'

let dict: Set<string> = new Set()

export async function loadDict(options: Options) {
  if (dict.size)
    return dict

  const { customDict } = options
  try {
    if (!customDict) {
      const _require = createRequire(import.meta.url)
      // jit stub treat `import()` is not same with build
      // const Words = (await import('impolite-word')).default
      const Words = _require('impolite-word')
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
