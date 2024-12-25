import { z } from 'zod'

export const MessageRoleSchema = z.enum(['system', 'user', 'assistant'])
export type MessageRole = z.infer<typeof MessageRoleSchema>

export const MessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string()
})
export type Message = z.infer<typeof MessageSchema>

export const ChatMessageSchema = z.object({
  id: z.string(),
  type: z.enum(['user', 'assistant', 'error']),
  content: z.string(),
  timestamp: z.number()
})
export type ChatMessage = z.infer<typeof ChatMessageSchema>

export const ChatStateSchema = z.object({
  messages: z.array(ChatMessageSchema),
  isLoading: z.boolean(),
  error: z.string().nullable()
})
export type ChatState = z.infer<typeof ChatStateSchema>