import Words from 'impolite-word'
import MagicString from 'magic-string'
import type { TransformResult } from 'unplugin'
import { bold, cyan, dim, italic, red } from 'picocolors'
import type { Options } from './types'

const impoliteSet = new Set(Words)

function logOutput(word: string, column: number, filePath: string) {
  const _word = red(bold(word))
  const _filePath = cyan(italic(filePath))
  const _date = dim(new Date().toLocaleTimeString())
  // eslint-disable-next-line no-console
  console.log(
    `${_date} ${cyan(bold('[vite:polite]'))} ${red('impolite words detected:')} ${_word} in ${_filePath} at line ${cyan(column)}`,
  )
}

export function transform(code: string, id: string, options: Options): TransformResult {
  const _code = new MagicString(code)
  const lines = code.split('\n')
  let count = 0
  lines.forEach((line, ind) => {
    impoliteSet.forEach((word) => {
      if (new RegExp(word, 'g').test(line)) {
        logOutput(word, ind + 1, id)
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
