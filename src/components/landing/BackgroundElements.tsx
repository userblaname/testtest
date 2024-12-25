import { cn } from '@/lib/utils'

interface BackgroundElementsProps {
  className?: string
}

export default function BackgroundElements({ className }: BackgroundElementsProps) {
  return (
    <>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-transparent via-[#3A6EA5]/10 to-transparent",
        className
      )} />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </>
  )
}