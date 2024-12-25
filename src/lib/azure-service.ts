import { OpenAIClient, AzureKeyCredential } from "@azure/openai"
import { TUFTI_SYSTEM_PROMPT } from "./tufti"
import type { Message, UserProfile } from "./types"

export class AzureService {
  private static instance: AzureService
  private client: OpenAIClient | null = null

  private constructor() {
    const endpoint = import.meta.env.VITE_AZURE_ENDPOINT
    const apiKey = import.meta.env.VITE_AZURE_API_KEY

    if (!endpoint || !apiKey) {
      console.error("Azure OpenAI credentials not found")
      return
    }

    try {
      this.client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey))
      console.log("Azure OpenAI client initialized successfully")
    } catch (error) {
      console.error("Failed to initialize Azure OpenAI client:", error)
      this.client = null
    }
  }

  static getInstance(): AzureService {
    if (!AzureService.instance) {
      AzureService.instance = new AzureService()
    }
    return AzureService.instance
  }

  async generateResponse(userMessage: string, context: Message[], userProfile?: UserProfile): Promise<string> {
    if (!this.client) {
      throw new Error("Azure OpenAI client not initialized")
    }

    const deploymentName = import.meta.env.VITE_AZURE_DEPLOYMENT_NAME
    if (!deploymentName) {
      throw new Error("Azure deployment name not configured")
    }

    try {
      const messages = [
        { role: "system", content: TUFTI_SYSTEM_PROMPT },
        ...(userProfile ? [{
          role: "system",
          content: `Current user: ${userProfile.name}
Experience level: ${userProfile.rtExperience}
Focus area: ${userProfile.realityFocus}
Transformation goal: ${userProfile.transformationIntent}`
        }] : []),
        ...context.map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        })),
        { role: "user", content: userMessage }
      ]

      const response = await this.client.getChatCompletions(
        deploymentName,
        messages,
        {
          temperature: 0.7,
          maxTokens: 1500,
          topP: 0.92,
          frequencyPenalty: 0.18,
          presencePenalty: 0.15
        }
      )

      const generatedText = response.choices[0]?.message?.content
      if (!generatedText) {
        throw new Error("No response generated")
      }

      return generatedText
    } catch (error) {
      console.error("Failed to generate response:", error)
      throw error
    }
  }
}