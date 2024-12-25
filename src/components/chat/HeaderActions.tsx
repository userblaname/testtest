import { memo } from 'react'
import { History, Film, Settings } from 'lucide-react'
import { Tooltip } from '@/components/ui/tooltip'
import IconButton from '@/components/ui/icon-button'
import { motion } from 'framer-motion'

interface HeaderActionsProps {
  onClearChat: () => void
  className?: string
}

const actionVariants = {
  initial: { opacity: 0, x: 20 },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: "easeOut"
    }
  })
}

const HeaderActions = memo(({ onClearChat, className }: HeaderActionsProps) => {
  const actions = [
    {
      icon: History,
      label: "Clear film reel",
      tooltip: "Clear chat history",
      onClick: onClearChat
    },
    {
      icon: Film,
      label: "Director's tools",
      tooltip: "Open director's tools"
    },
    {
      icon: Settings,
      label: "Settings",
      tooltip: "Open settings"
    }
  ]

  return (
    <motion.div 
      className="flex items-center gap-3"
      role="toolbar" 
      aria-label="Chat controls"
    >
      {actions.map((action, i) => (
        <motion.div
          key={action.label}
          custom={i}
          variants={actionVariants}
          initial="initial"
          animate="animate"
        >
          <Tooltip content={action.tooltip}>
            <IconButton
              onClick={action.onClick}
              className="bg-tufti-surface/40 hover:bg-tufti-surface/60 backdrop-blur-sm border border-tufti-gold/10 hover:border-tufti-gold/20 transition-all duration-300"
              label={action.label}
            >
              <action.icon className="w-5 h-5 text-tufti-gold/80" />
            </IconButton>
          </Tooltip>
        </motion.div>
      ))}
    </motion.div>
  )
})

HeaderActions.displayName = 'HeaderActions'

export default HeaderActions