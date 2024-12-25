import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, label, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative p-2 rounded-lg text-tufti-white/80 hover:text-tufti-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-tufti-red/50",
        "transition-colors duration-200",
        className
      )}
      aria-label={label}
      {...props}
    >
      {children}
      <div className="absolute inset-0 rounded-lg border border-tufti-red/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  )
)

IconButton.displayName = 'IconButton'

export default IconButton