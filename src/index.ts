import path from 'path'
import { createUnplugin } from 'unplugin'
import { defaultOptions } from './options'
import { transform as politeTransform } from './transform'
import type { GeneralOptions, Options } from './types'

const unplugin = createUnplugin<GeneralOptions>((options) => {
  const _options: Options = { ...defaultOptions, ...options }

  return {
    name: 'unplugin-keep-polite',
    enforce: 'pre',
    transformInclude(id) {
      if (id.includes('node_modules'))
        return false

      // filter plugins
      if (path.extname(id))
        return true
      return false
    },
    async transform(code, id) {
      return await politeTransform(code, id, _options)
    },
  }
})

export default unplugin
