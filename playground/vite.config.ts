import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginReload from 'vite-plugin-reload'
import unPluginPolite from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginReload({
      includes: ['../src/**/*.{ts,tsx}'],
    }),
    unPluginPolite.vite(),
  ],
  resolve: {
    alias: {
      '~/': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
