import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePlugin } from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePlugin({
    auto: false,
  })],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
