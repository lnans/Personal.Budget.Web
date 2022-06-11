import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin({ exclude: '**/*.(scss|scss?used)' }), EnvironmentPlugin('all', { prefix: 'VITE_' })],
  envDir: 'env',
  resolve: {
    alias: {
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@models': path.resolve(__dirname, './src/models'),
      '@api': path.resolve(__dirname, './src/api'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
