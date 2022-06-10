import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { rollupPlugin } from 'unplugin-keep-polite'
export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    rollupPlugin(),
  ],
})
