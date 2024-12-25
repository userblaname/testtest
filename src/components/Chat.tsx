import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useChat } from '@/hooks/useChat'
import Header from './chat/Header'
import MessageList from './chat/MessageList'
import ChatInput from './ChatInput'
import type { UserProfile } from '@/lib/types'

interface ChatProps {
  userProfile: UserProfile
}

export default function Chat({ userProfile }: ChatProps) {
  const { 
    messages, 
    isTyping, 
    isGenerating, 
    sendMessage, 
    updateMessageFeedback, 
    retryLastMessage,
    clearChat 
  } = useChat(userProfile)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col h-screen bg-tufti-black/90 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-tufti-black/80 via-transparent to-tufti-black/80 pointer-events-none z-10" />
      
      <div className="relative z-20 flex flex-col h-full">
        <div className="h-2 bg-gradient-to-r from-tufti-red/20 via-tufti-red to-tufti-red/20" />
        
        <Header onClearChat={clearChat} userName={userProfile.name} />
        
        <MessageList
          messages={messages}
          isTyping={isTyping}
          onRetry={retryLastMessage}
          onFeedback={updateMessageFeedback}
        />

        <ChatInput 
          onSendMessage={sendMessage} 
          disabled={isTyping} 
          isGenerating={isGenerating}
        />
        
        <div className="h-2 bg-gradient-to-r from-tufti-red/20 via-tufti-red to-tufti-red/20" />
      </div>
    </motion.div>
  )
}