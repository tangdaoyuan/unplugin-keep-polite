import { createUnplugin } from 'unplugin'
import { defaultOptions } from './options'
import { transform as politeTransform } from './transform'
import type { GeneralOptions, UserOptions } from './types'

export const unplugin = createUnplugin<GeneralOptions>((options) => {
  const _options = { ...defaultOptions, ...options } as UserOptions
  return {
    name: 'keep-polite-unplugin',
    enforce: 'pre',
    // webpack's id filter is outside of loader logic,
    // an additional hook is needed for better perf on webpack
    transformInclude(id) {
      // eslint-disable-next-line no-console
      console.log(id)
      return id.endsWith('.vue')
    },
    transform(code, id) {
      return politeTransform(code, id, _options)
    },
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const esbuildPlugin = unplugin.esbuild
