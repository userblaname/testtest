import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import MessageAvatar from './MessageAvatar'
import MessageContent from './MessageContent'
import MessageActions from './MessageActions'
import type { Message as MessageType } from '@/lib/types'

interface MessageProps {
  message: MessageType
  showRetry?: boolean
  className?: string
}

const Message = memo(({ message, showRetry, className }: MessageProps) => {
  const [copied, setCopied] = useState(false)

  return (
    <motion.div 
      className={cn(
        "flex mb-4 md:mb-6 px-2 md:px-0",
        message.sender === "user" ? "justify-end" : "justify-start",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className={cn(
        "flex items-end group max-w-[85%] md:max-w-[75%]",
        message.sender === "user" ? "flex-row-reverse" : ""
      )}>
        <MessageAvatar 
          sender={message.sender}
          className={message.sender === "user" ? "ml-2 md:ml-3" : "mr-2 md:mr-3"}
        />

        <div className="relative">
          <MessageContent message={message} />
          
          {message.sender === "tufti" && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <MessageActions
                messageId={message.id}
                text={message.text}
                copied={copied}
                hasFeedback={!!message.feedback}
                showRetry={showRetry}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
})

Message.displayName = 'Message'

export default Message