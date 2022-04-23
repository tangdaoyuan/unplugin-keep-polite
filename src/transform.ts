/* eslint-disable no-console */
import Words from 'impolite-word'
import MagicString from 'magic-string'
import type { TransformResult } from 'unplugin'
import type { UserOptions } from './types'

const impoliteSet = new Set(Words)

export function transform(code: string, id: string, options: UserOptions): TransformResult {
  const _code = new MagicString(code)
  const lines = code.split('\n')
  let count = 0
  lines.forEach((line, ind) => {
    impoliteSet.forEach((word) => {
      if (new RegExp(word, 'g').test(line)) {
        // logger
        console.log(`Don't use impolite word: '${word}' in ${id} at line ${ind + 1}`)
        // TODO
        // support replace regex
        if (options.auto) {
          const _preplace = options.replace as string
          const _line = line.replace(new RegExp(word, 'g'), _preplace)
          _code.overwrite(count, count + line.length + 1, `${_line}\n`)
        }
      }
    })
    count += line.length + 1
  })
  return { code: _code.toString(), map: _code.generateMap() }
}
