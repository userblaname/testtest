import { memo } from 'react'
import { Film, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeaderTitleProps {
  className?: string
}

const titleVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const decorationVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2
    }
  }
}

const iconVariants = {
  rotate: {
    rotate: [0, 360],
    transition: { 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
}

const HeaderTitle = memo(({ className }: HeaderTitleProps) => (
  <motion.div 
    className={cn("relative flex items-center justify-center gap-3 py-6", className)}
    variants={titleVariants}
    initial="initial"
    animate="animate"
    role="banner"
    aria-label="Tufti's Reality Film"
  >
    {/* Decorative elements */}
    <motion.div 
      variants={decorationVariants}
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tufti-gold to-transparent opacity-30"
    />
    <motion.div 
      variants={decorationVariants}
      className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-tufti-gold to-transparent opacity-30"
    />
    
    {/* Left decoration */}
    <motion.div
      variants={decorationVariants}
      className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2"
    >
      <div className="w-8 h-px bg-gradient-to-r from-transparent to-tufti-gold/30" />
      <Star className="w-3 h-3 text-tufti-gold/30" />
    </motion.div>

    {/* Right decoration */}
    <motion.div
      variants={decorationVariants}
      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2"
    >
      <Star className="w-3 h-3 text-tufti-gold/30" />
      <div className="w-8 h-px bg-gradient-to-l from-transparent to-tufti-gold/30" />
    </motion.div>

    {/* Main title content */}
    <div className="flex items-center gap-4">
      <motion.div
        variants={iconVariants}
        animate={["rotate", "pulse"]}
        className="relative"
      >
        <Film 
          className="w-10 h-10 text-tufti-red baroque-float" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-tufti-gold/20 to-transparent rounded-full blur-sm" />
      </motion.div>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-baroque text-tufti-white tracking-wide">
          Tufti&apos;s Reality Film
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-tufti-gold/60 font-modern tracking-widest uppercase mt-1"
        >
          Compose Your Reality
        </motion.div>
      </div>
    </div>
  </motion.div>
))

HeaderTitle.displayName = 'HeaderTitle'

export default HeaderTitle