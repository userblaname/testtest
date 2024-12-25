import { memo, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useVirtualScroll } from '@/hooks/useVirtualScroll'
import { useMessageCache } from '@/hooks/useMessageCache'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageProvider } from '@/contexts/MessageContext'
import Message from './Message'
import LoadingIndicator from '@/components/ui/loading-spinner'
import type { Message as MessageType } from '@/lib/types'

interface VirtualMessageListProps {
  messages: MessageType[]
  isTyping: boolean
  onRetry?: () => void
  onFeedback?: (messageId: number, feedback: MessageType['feedback']) => void
  className?: string
}

const VirtualMessageList = memo(({ 
  messages, 
  isTyping, 
  onRetry, 
  onFeedback,
  className 
}: VirtualMessageListProps) => {
  const { parentRef, scrollingRef, virtualRows, totalSize, scrollToBottom } = useVirtualScroll(messages)
  const { addToCache, getFromCache } = useMessageCache()

  useEffect(() => {
    messages.forEach(addToCache)
  }, [messages, addToCache])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages.length, scrollToBottom])

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
        ref={scrollingRef} 
        className={cn("flex-1 px-4 md:px-6", className)}
      >
        <div 
          ref={parentRef}
          className="max-w-3xl mx-auto py-6"
          style={{ height: `${totalSize}px`, position: 'relative' }}
        >
          {virtualRows.map(virtualRow => {
            const message = getFromCache(messages[virtualRow.index].id)
            if (!message) return null

            return (
              <div
                key={message.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <Message 
                  message={message}
                  showRetry={virtualRow.index === messages.length - 1}
                />
              </div>
            )
          })}

          <AnimatePresence>
            {isTyping && (
              <div className="pl-12 mt-4">
                <LoadingIndicator />
              </div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </MessageProvider>
  )
})

VirtualMessageList.displayName = 'VirtualMessageList'

export default VirtualMessageList