
import MagicString from 'magic-string'
import type { TransformResult } from 'unplugin'
import { bold, cyan, dim, italic, red } from 'picocolors'
import type { Options } from './types'
import { loadDict } from './loader'

function logOutput(word: string, column: number, filePath: string) {
  const _word = red(bold(word))
  const _filePath = cyan(italic(filePath))
  const _date = dim(new Date().toLocaleTimeString())
  // eslint-disable-next-line no-console
  console.log(
    `${_date} ${cyan(bold('[vite:polite]'))} ${red('impolite words detected:')} ${_word} in ${_filePath} at line ${cyan(column)}`,
  )
}

export async function transform(code: string, id: string, options: Options): Promise<TransformResult> {
  const impoliteSet = await loadDict(options)
  const _code = new MagicString(code)
  const lines = code.split('\n')
  let count = 0
  lines.forEach((line, ind) => {
    impoliteSet.forEach((word) => {
      if (new RegExp(`(\\W|\^)${word}(\\W|\$)`, 'g').test(line)) {
        logOutput(word, ind + 1, id)

        if (options.autoReplace) {
          let filterLine = ''
          const _preplace = options.replacer as string
          if (typeof _preplace === 'string')
            filterLine = line.replace(new RegExp(word, 'g'), _preplace)

          else if (typeof _preplace === 'function')
            filterLine = (_preplace as Function)(line)

          _code.overwrite(count, count + line.length + 1, `${filterLine}\n`)
        }
      }
    })
    count += line.length + 1
  })
  return { code: _code.toString(), map: _code.generateMap() }
}
