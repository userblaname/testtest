import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Chat from './components/Chat'
import LandingPage from './pages/LandingPage'
import OnboardingForm from './components/onboarding/OnboardingForm'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import type { UserProfile } from './lib/types'

function AppContent() {
  const { isAuthenticated } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
  }

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return (
    <AnimatePresence mode="wait">
      {!userProfile ? (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      ) : (
        <Chat userProfile={userProfile} />
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App