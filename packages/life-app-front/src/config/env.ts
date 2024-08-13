// don't use alias here, vite doesn't not have aliases at pre build time
import { createSchema, stringRequired } from '../lib/validation'

const createEnv = () => {
  const EnvSchema = createSchema({
    API_URL: stringRequired(),
  })

  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value
    }
    return acc
  }, {})

  const parsedEnv = EnvSchema.safeParse(envVars)

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}
`,
    )
  }

  return parsedEnv.data
}

export const env = createEnv()
