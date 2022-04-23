import { createUnplugin } from 'unplugin'
import type { UserOptions } from './types'

// TODO
// create virtual plugin demo and test it

export const unplugin = createUnplugin<UserOptions>(() => {
  return {
    name: 'virtual-unplugin',
    enforce: 'pre',
    // webpack's id filter is outside of loader logic,
    // an additional hook is needed for better perf on webpack
    transformInclude(id) {
      return id.endsWith('.vue')
    },
    transform(code) {
      return code.replace(/<template>/, '<template><div>Injected Test</div>')
    },
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const esbuildPlugin = unplugin.esbuild
