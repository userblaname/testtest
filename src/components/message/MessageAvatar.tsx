import { memo } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface MessageAvatarProps {
  sender: 'user' | 'tufti' | 'system'
  className?: string
}

const MessageAvatar = memo(({ sender, className }: MessageAvatarProps) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    <Avatar 
      className={cn(
        "w-6 h-6 md:w-8 md:h-8",
        sender === "tufti" && "baroque-float"
      )}
      role="img"
      aria-label={`${sender === "user" ? "User" : "Tufti"} avatar`}
    >
      <AvatarFallback 
        className={cn(
          "text-xs md:text-sm",
          sender === "user" 
            ? "bg-tufti-silver text-tufti-black font-modern"
            : "bg-tufti-red text-tufti-white font-baroque"
        )}
      >
        {sender === "user" ? "U" : "T"}
      </AvatarFallback>
      <AvatarImage 
        src={sender === "user" ? "/user-avatar.png" : "/assets/tufti-throne.png"}
        alt={sender === "user" ? "User" : "Tufti on baroque throne"}
        className={sender === "tufti" ? "object-cover" : ""}
      />
    </Avatar>
  </motion.div>
))

MessageAvatar.displayName = 'MessageAvatar'

export default MessageAvatar