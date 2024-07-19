/// <reference types="vite/client" />

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import ViteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import ViteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    ViteReact(),
    ViteTsconfigPaths(),
    TanStackRouterVite({ routesDirectory: './src/app', generatedRouteTree: './src/routeTree.gen.ts' }),
  ],
  server: {
    port: 4200,
  },
  preview: {
    port: 4200,
  },
  optimizeDeps: { exclude: ['fsevents'] },
})
