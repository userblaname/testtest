import { memo } from 'react'
import { motion } from 'framer-motion'
import HeaderTitle from './HeaderTitle'
import HeaderActions from './HeaderActions'

interface HeaderProps {
  onClearChat: () => void
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const Header = memo(({ onClearChat }: HeaderProps) => (
  <motion.header
    className="relative bg-gradient-to-b from-tufti-surface/80 to-transparent backdrop-blur-sm"
    initial="hidden"
    animate="visible"
    variants={headerVariants}
    role="banner"
  >
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <HeaderTitle />
        <HeaderActions onClearChat={onClearChat} />
      </div>
    </div>
    
    {/* Decorative bottom border */}
    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-tufti-red/20 to-transparent" />
    
    {/* Ambient glow */}
    <div className="absolute -bottom-20 inset-x-0 h-20 bg-gradient-to-b from-tufti-red/5 to-transparent pointer-events-none" />
  </motion.header>
))

Header.displayName = 'Header'

export default Header