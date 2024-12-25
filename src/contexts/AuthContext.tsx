import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { type User } from '@/lib/types'
import { isAdminUser } from '@/lib/admin'
import type { AuthState, UserProfile } from '@/lib/types'

interface AuthContextType extends AuthState {
  user: User | null
  loading: boolean
  userProfile: UserProfile | null
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize with no user
    setLoading(false)
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    // Check for admin credentials first
    if (isAdminUser(email, password)) {
      const adminUser = {
        uid: 'admin',
        email,
        displayName: 'Admin',
      } as User

      const adminProfile: UserProfile = {
        name: 'Admin',
        rtExperience: 'advanced',
        booksRead: ['transurfing_1_5', 'tufti'],
        realityFocus: 'purpose',
        transformationIntent: 'understanding',
        preferences: {
          theme: 'dark',
          notifications: true
        }
      }

      setUser(adminUser)
      setUserProfile(adminProfile)
      return
    }

    // Mock user authentication
    const mockUser = {
      uid: 'user-123',
      email,
      displayName: email.split('@')[0]
    } as User

    const defaultProfile: UserProfile = {
      name: '',
      rtExperience: 'beginner',
      booksRead: [],
      realityFocus: 'purpose',
      transformationIntent: 'understanding',
      preferences: {
        theme: 'dark',
        notifications: true
      }
    }

    setUser(mockUser)
    setUserProfile(defaultProfile)
  }

  const signInWithGoogle = async () => {
    // Mock Google authentication
    const mockUser = {
      uid: 'google-user-123',
      email: 'user@gmail.com',
      displayName: 'Google User'
    } as User

    const defaultProfile: UserProfile = {
      name: 'Google User',
      rtExperience: 'beginner',
      booksRead: [],
      realityFocus: 'purpose',
      transformationIntent: 'understanding',
      preferences: {
        theme: 'dark',
        notifications: true
      }
    }

    setUser(mockUser)
    setUserProfile(defaultProfile)
  }

  const value = {
    user,
    loading,
    userProfile,
    isAuthenticated: !!user,
    signInWithEmail,
    signInWithGoogle,
    logout: async () => {
      if (user?.uid === 'admin') {
        setUser(null)
        setUserProfile(null)
      } else {
        setUser(null)
        setUserProfile(null)
      }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}