import { memo } from 'react'
import { motion } from 'framer-motion'
import type { Message } from '@/lib/types'

interface MessageContentProps {
  message: Message
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const MessageContent = memo(({ message }: MessageContentProps) => (
  <motion.div
    variants={contentVariants}
    initial="hidden"
    animate="visible"
    className={`
      relative p-3 md:p-4 rounded-2xl shadow-lg baroque-shadow
      ${message.sender === "user" 
        ? "bg-gradient-to-br from-tufti-silver/90 to-tufti-silver/80 text-tufti-black" 
        : "bg-gradient-to-br from-tufti-red via-tufti-red/90 to-tufti-black text-tufti-white"}
      ${message.sender === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}
    `}
  >
    <div className={`
      relative z-10
      ${message.sender === "tufti" 
        ? "font-baroque text-base md:text-lg leading-relaxed" 
        : "font-modern text-sm md:text-base"}
    `}>
      {message.text}
    </div>

    <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-[2px] pointer-events-none" />
    
    {message.sender === "tufti" && (
      <div className="absolute inset-0 rounded-2xl bg-[url('/assets/baroque-pattern.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
    )}
  </motion.div>
))

MessageContent.displayName = 'MessageContent'

export default MessageContent