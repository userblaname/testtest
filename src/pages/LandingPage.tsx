import BackgroundElements from '@/components/landing/BackgroundElements'
import Header from '@/components/landing/Header'
import AuthForm from '@/components/landing/AuthForm'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A14] text-white overflow-hidden relative">
      <BackgroundElements />
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Header />
        <AuthForm />
      </div>
    </div>
  )
}