import { memo, useRef, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageProvider } from '@/contexts/MessageContext'
import Message from './Message'
import LoadingIndicator from '@/components/ui/loading-spinner'
import type { Message as MessageType } from '@/lib/types'

interface MessageListProps {
  messages: MessageType[]
  isTyping: boolean
  onRetry?: () => void
  onFeedback?: (messageId: number, feedback: MessageType['feedback']) => void
  className?: string
}

const MessageList = memo(({ 
  messages, 
  isTyping, 
  onRetry, 
  onFeedback,
  className 
}: MessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [loadMoreRef, inView] = useInView()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current && messages.length > 0) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const messageContextValue = {
    updateMessageFeedback: onFeedback || (() => {}),
    retryMessage: () => onRetry?.(),
    copyMessage: async (text: string) => {
      await navigator.clipboard.writeText(text)
      return true
    }
  }

  return (
    <MessageProvider value={messageContextValue}>
      <ScrollArea 
        ref={scrollAreaRef} 
        className={cn("flex-1 px-4 md:px-6", className)}
      >
        <div className="max-w-3xl mx-auto py-6 space-y-6">
          <div ref={loadMoreRef} className="h-1" />
          
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                layout
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Message 
                  message={message}
                  showRetry={message.sender === 'tufti' && index === messages.length - 1}
                />
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pl-12"
              >
                <LoadingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </MessageProvider>
  )
})

MessageList.displayName = 'MessageList'

export default MessageList