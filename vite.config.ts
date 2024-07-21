/// <reference types="vite/client" />

import terser from '@rollup/plugin-terser'
import ViteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import ViteTsconfigPaths from 'vite-tsconfig-paths'

import { ViteValidateEnv } from './vite.plugins'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [ViteReact(), ViteTsconfigPaths(), ViteValidateEnv()],
  server: {
    port: 4200,
    host: '0.0.0.0',
  },
  preview: {
    port: 4200,
  },
  optimizeDeps: { exclude: ['fsevents'] },
  build: {
    minify: 'terser',
    rollupOptions: {
      plugins: [
        terser({
          format: {
            comments: false,
          },

          mangle: {
            keep_classnames: false,
            reserved: [],
          },
        }),
      ],
    },
  },
})
