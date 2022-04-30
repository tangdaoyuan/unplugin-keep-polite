import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginReload from 'vite-plugin-reload'
import { vitePlugin as VitePluginPolite } from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginReload({
      includes: ['../src/**/*.{ts,tsx}'],
    }),
    VitePluginPolite({
      auto: false,
    })],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
