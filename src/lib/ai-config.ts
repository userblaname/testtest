import { AzureKeyCredential } from "@azure/ai-language-text"
import { OpenAIClient } from "@azure/openai"

export const azureConfig = {
  endpoint: import.meta.env.VITE_AZURE_ENDPOINT || "",
  apiKey: import.meta.env.VITE_AZURE_API_KEY || "",
  deploymentName: import.meta.env.VITE_AZURE_DEPLOYMENT_NAME || "",
}

export const openAIConfig = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  organization: import.meta.env.VITE_OPENAI_ORG || "",
}

export const azureClient = new OpenAIClient(
  azureConfig.endpoint,
  new AzureKeyCredential(azureConfig.apiKey)
)