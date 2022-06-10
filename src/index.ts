import path from 'path'
import { createUnplugin } from 'unplugin'
import { defaultOptions } from './options'
import { transform as politeTransform } from './transform'
import type { GeneralOptions, Options } from './types'

const unplugin = createUnplugin<GeneralOptions>((options, meta) => {
  // ignore webpack production mode
  if (
    meta.framework === 'webpack'
    && meta.webpack?.compiler.options.mode === 'production'
  ) {
    return {
      name: 'keep-polite-unplugin',
      transformInclude: (id) => {
        return !!id
      },
      transform: (code) => {
        return { code, sourceMap: null }
      },
    }
  }

  const _options: Options = { ...defaultOptions, ...options }

  return {
    name: 'keep-polite-unplugin',
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

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const esbuildPlugin = unplugin.esbuild
