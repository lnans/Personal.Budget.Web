/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    reporters: 'default',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components'],
    },
  },
})
