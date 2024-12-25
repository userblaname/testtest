import { OpenAIClient, AzureKeyCredential } from "@azure/openai"
import { AZURE_CONFIG, CHAT_CONFIG } from '../config/azure'
import { TUFTI_SYSTEM_PROMPT } from "../tufti"
import type { Message, UserProfile } from '../types/chat'

export class AzureChatService {
  private static instance: AzureChatService
  private client: OpenAIClient
  private onStreamUpdate?: (text: string) => void

  private constructor() {
    try {
      this.client = new OpenAIClient(
        AZURE_CONFIG.endpoint, 
        new AzureKeyCredential(AZURE_CONFIG.apiKey)
      )
      console.log("Azure OpenAI client initialized")
    } catch (error) {
      console.error("Azure OpenAI client initialization failed:", error)
      throw error
    }
  }

  static getInstance(): AzureChatService {
    if (!AzureChatService.instance) {
      AzureChatService.instance = new AzureChatService()
    }
    return AzureChatService.instance
  }

  setStreamUpdateHandler(handler: (text: string) => void) {
    this.onStreamUpdate = handler
  }

  async sendMessage(message: string, userProfile?: UserProfile): Promise<string> {
    const messages: Message[] = [
      { role: 'system', content: TUFTI_SYSTEM_PROMPT },
      { role: 'user', content: message }
    ]

    try {
      const events = await this.client.streamChatCompletions(
        AZURE_CONFIG.deploymentId,
        messages,
        {
          ...CHAT_CONFIG
        }
      )

      let response = ""
      for await (const event of events) {
        for (const choice of event.choices) {
          const newText = choice.delta?.content
          if (newText) {
            response += newText
            this.onStreamUpdate?.(response)
          }
        }
      }
      return response
    } catch (error) {
      console.error("Chat completion error:", error)
      throw error
    }
  }
}