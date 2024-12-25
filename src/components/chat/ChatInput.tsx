import { useState, useRef, memo } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInputAnimation } from '@/hooks/useInputAnimation'
import { useInputValidation } from '@/hooks/useInputValidation'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'
import AnimatedInput from './AnimatedInput'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  isGenerating?: boolean
  className?: string
}

const ChatInput = memo(({ 
  onSendMessage, 
  disabled, 
  isGenerating,
  className 
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { scope, animateFocus, animateSubmit } = useInputAnimation()
  const { error, validate, clearError } = useInputValidation()
  const { lightTap, success } = useHapticFeedback()

  const handleSend = async () => {
    if (inputValue.trim() && !disabled && validate(inputValue)) {
      await animateSubmit()
      success()
      onSendMessage(inputValue.trim())
      setInputValue('')
      clearError()
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    animateFocus(true)
    lightTap()
  }

  const handleBlur = () => {
    setIsFocused(false)
    animateFocus(false)
  }

  return (
    <motion.div
      ref={scope}
      className={cn("relative p-3", className)}
      role="form"
      aria-label="Message input"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          <div className={cn(
            "absolute inset-0 rounded-lg transition-all duration-300",
            "bg-gradient-to-r from-tufti-red/20 via-tufti-gold/20 to-tufti-red/20",
            "opacity-0 group-hover:opacity-100",
            isFocused && "opacity-100 blur-sm"
          )} />

          <div className="relative flex items-center">
            <AnimatedInput
              ref={inputRef}
              type="text"
              placeholder="Direct your scene..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              error={error}
              isFocused={isFocused}
            />
            
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-7 h-7 rounded-lg bg-tufti-red/10 flex items-center justify-center"
                  >
                    <Loader2 className="w-4 h-4 text-tufti-red" />
                  </motion.div>
                </motion.div>
              ) : (
                <Button
                  key="send"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || disabled}
                  className={cn(
                    "absolute right-2",
                    "w-7 h-7 rounded-lg",
                    "bg-gradient-to-r from-tufti-red to-tufti-red/80",
                    "flex items-center justify-center",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "hover:shadow-[0_0_15px_rgba(255,0,51,0.3)]"
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </Button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-tufti-silver/60 font-baroque italic"
          >
            Composing the next scene...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

ChatInput.displayName = 'ChatInput'

export default ChatInput