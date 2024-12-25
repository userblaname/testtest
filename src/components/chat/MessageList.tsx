import { memo, useRef, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import Message from '@/components/Message'
import LoadingIndicator from './LoadingIndicator'
import type { Message as MessageType } from '@/lib/types'

interface MessageListProps {
  messages: MessageType[]
  isTyping: boolean
  onRetry?: () => void
  onFeedback?: (messageId: number, feedback: MessageType['feedback']) => void
}

const MessageList = memo(({ messages, isTyping, onRetry, onFeedback }: MessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [loadMoreRef, inView] = useInView()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current && messages.length > 0) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 px-4 md:px-6"
      onScrollCapture={(e) => {
        const target = e.currentTarget
        if (target.scrollTop === 0 && inView) {
          // Handle load more if needed
        }
      }}
    >
      <div className="max-w-3xl mx-auto py-6 space-y-6">
        <div ref={loadMoreRef} className="h-1" />
        
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message 
                message={message}
                onRetry={message.sender === 'tufti' ? onRetry : undefined}
                onFeedback={message.sender === 'tufti' ? (feedback) => onFeedback?.(message.id, feedback) : undefined}
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
  )
})

MessageList.displayName = 'MessageList'

export default MessageList