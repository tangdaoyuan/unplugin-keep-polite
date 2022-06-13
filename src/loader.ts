import p from 'path'
import { readFile } from 'fs/promises'
import { createRequire } from 'node:module'
import type { Options } from './types'

let dict: Set<string> = new Set()

let regexp: RegExp | null = null

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

export async function parseDict(words?: Set<string>) {
  if (words)
    return _generateRegExp(words)
  if (regexp)
    return regexp
  if (dict.size) {
    regexp = _generateRegExp(dict)
    return regexp
  }

  console.warn('impolite-word dict is not provided')
  return null
}

function _generateRegExp(words: Set<string>) {
  const str = [...words.values()].join('|').replace(/\s/g, '\\s')
  const reg = new RegExp(`(\\W|\^)(?<word>${str})(\\W|\$)`, 'g')
  return reg
}
