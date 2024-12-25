import { validateEnv } from './env'

const env = validateEnv()

export const AZURE_CONFIG = {
  endpoint: env.VITE_AZURE_OPENAI_ENDPOINT,
  apiKey: env.VITE_AZURE_OPENAI_API_KEY,
  deploymentId: env.VITE_AZURE_OPENAI_DEPLOYMENT_ID,
} as const

export const CHAT_CONFIG = {
  maxTokens: 1500,
  temperature: 0.7,
  topP: 0.92,
  frequencyPenalty: 0.18,
  presencePenalty: 0.15
} as const