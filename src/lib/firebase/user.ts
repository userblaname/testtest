import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './config'
import type { UserProfile } from '../types'

export async function createUserProfile(userId: string, profile: UserProfile): Promise<void> {
  const userRef = doc(db, 'users', userId)
  await setDoc(userRef, profile)
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', userId)
  const snapshot = await getDoc(userRef)
  return snapshot.exists() ? snapshot.data() as UserProfile : null
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, 'users', userId)
  await setDoc(userRef, updates, { merge: true })
}