import { useState, useCallback, useRef } from 'react'
import { ChatService } from '@/lib/chat-service'
import type { Message, UserProfile } from '@/lib/types'

const MESSAGES_PER_PAGE = 20

export interface UseChatReturn {
  messages: Message[]
  isTyping: boolean
  isGenerating: boolean
  hasMore: boolean
  sendMessage: (text: string) => Promise<void>
  updateMessageFeedback: (messageId: number, feedback: Message['feedback']) => void
  retryLastMessage: () => Promise<void>
  clearChat: () => void
  loadMoreMessages: () => Promise<void>
}

export function useChat(userProfile: UserProfile): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const pageRef = useRef(1)
  const chatService = ChatService.getInstance()

  // Initialize chat with welcome message using user's name
  useState(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: `Ah, welcome ${userProfile.name}! I see you've come seeking guidance about ${userProfile.transformationIntent}. Let's explore this scene in your reality film together.`,
      sender: "tufti",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  })

  const loadMoreMessages = useCallback(async () => {
    if (!hasMore) return

    try {
      const olderMessages = await chatService.loadMessages(pageRef.current * MESSAGES_PER_PAGE)
      if (olderMessages.length < MESSAGES_PER_PAGE) {
        setHasMore(false)
      }
      setMessages(prev => [...olderMessages, ...prev])
      pageRef.current += 1
    } catch (error) {
      console.error("Failed to load more messages:", error)
    }
  }, [hasMore])

  const sendMessage = useCallback(async (text: string) => {
    if (!isTyping) {
      const userMessage: Message = {
        id: Date.now(),
        text,
        sender: "user",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, userMessage])
      setIsTyping(true)
      setIsGenerating(true)

      try {
        const response = await chatService.generateResponse(text, userProfile)
        const tuftiMessage: Message = {
          id: Date.now() + 1,
          text: response.text,
          sender: "tufti",
          timestamp: new Date(),
          metadata: response.metadata
        }
        setMessages(prev => [...prev, tuftiMessage])
      } catch (error) {
        console.error("Error generating response:", error)
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: "I apologize, but I seem to have encountered a technical difficulty. Could you please try again?",
          sender: "tufti",
          timestamp: new Date(),
          metadata: { relevanceScore: 0, cached: false }
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
        setIsGenerating(false)
      }
    }
  }, [isTyping, userProfile])

  const updateMessageFeedback = useCallback((messageId: number, feedback: Message['feedback']) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ))
  }, [])

  const retryLastMessage = useCallback(async () => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2]
      const lastTuftiMessage = messages[messages.length - 1]
      
      if (lastUserMessage.sender === "user" && lastTuftiMessage.sender === "tufti") {
        setMessages(prev => prev.slice(0, -1))
        await sendMessage(lastUserMessage.text)
      }
    }
  }, [messages, sendMessage])

  const clearChat = useCallback(() => {
    setMessages([])
    pageRef.current = 1
    setHasMore(false)
    chatService.clearContext()
  }, [])

  return {
    messages,
    isTyping,
    isGenerating,
    hasMore,
    sendMessage,
    updateMessageFeedback,
    retryLastMessage,
    clearChat,
    loadMoreMessages
  }
}