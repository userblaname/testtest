import { motion } from 'framer-motion'
import { Film } from 'lucide-react'
import { createStyles, textStyles, animationStyles } from '@/lib/styles'

export default function Header() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className={createStyles(
          "inline-block mb-6",
          animationStyles.float
        )}
      >
        <Film className="w-16 h-16 text-[#3A6EA5]" />
      </motion.div>
      
      <h1 className={createStyles(
        textStyles.heading,
        "text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight"
      )}>
        Your Reality Film, Transformed
      </h1>
      <p className={createStyles(
        textStyles.body,
        "text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
      )}>
        A conscious guide through your reality creation journey
      </p>
    </motion.div>
  )
}