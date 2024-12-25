import { z } from 'zod'

const envSchema = z.object({
  VITE_AZURE_OPENAI_ENDPOINT: z.string().url(),
  VITE_AZURE_OPENAI_API_KEY: z.string().min(1),
  VITE_AZURE_OPENAI_DEPLOYMENT_ID: z.string().min(1),
})

export const validateEnv = () => {
  const result = envSchema.safeParse({
    VITE_AZURE_OPENAI_ENDPOINT: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT,
    VITE_AZURE_OPENAI_API_KEY: import.meta.env.VITE_AZURE_OPENAI_API_KEY,
    VITE_AZURE_OPENAI_DEPLOYMENT_ID: import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_ID,
  })

  if (!result.success) {
    throw new Error('Missing or invalid environment variables')
  }

  return result.data
}