import { loadEnv, Plugin } from 'vite'

const c = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  normal: '\x1b[0m',
}

export const ViteValidateEnv = (): Plugin => {
  return {
    name: 'vite-validate-env',
    enforce: 'pre',
    apply: 'build',
    config: async (config, env) => {
      if (env.command !== 'build') {
        return
      }

      console.info(`${c.cyan}plugin:env: ${c.green}validating environment variables...${c.normal}`)
      const envLoaded = loadEnv(env.mode, process.cwd(), config.envPrefix)

      Object.assign(import.meta, { env: envLoaded })
      await import('./src/config/env')
    },
  }
}
