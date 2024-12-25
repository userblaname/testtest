import { z } from "zod"

// User Type
export interface User {
  uid: string
  email?: string | null
  displayName?: string | null
}

// Auth Types
export const AuthStateSchema = z.object({
  isAuthenticated: z.boolean(),
  user: z.object({
    uid: z.string(),
    email: z.string().email().optional(),
    displayName: z.string().optional()
  }).optional()
})

export type AuthState = z.infer<typeof AuthStateSchema>

// User Profile Types
export const RTExperienceLevel = z.enum([
  "newcomer",
  "aware",
  "beginner",
  "practitioner",
  "advanced"
])

export const RTBooks = z.array(z.enum([
  "transurfing_1_5",
  "tufti",
  "none",
  "other"
]))

export const RealityFocus = z.enum([
  "purpose",
  "life_changes",
  "relationships",
  "career",
  "balance",
  "other"
])

export const TransformationIntent = z.enum([
  "understanding",
  "specific_situations",
  "practice",
  "awareness",
  "breaking_patterns",
  "other"
])

export const UserProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rtExperience: RTExperienceLevel.default("beginner"),
  booksRead: RTBooks.default([]),
  realityFocus: RealityFocus.default("purpose"),
  focusDetails: z.string().optional().default(""),
  transformationIntent: TransformationIntent.default("understanding"),
  intentDetails: z.string().optional().default(""),
  preferences: z.object({
    theme: z.enum(["light", "dark"]).default("dark"),
    notifications: z.boolean().default(true)
  }).optional().default({
    theme: "dark",
    notifications: true
  })
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// Message Types
export const MessageSchema = z.object({
  id: z.number(),
  text: z.string(),
  sender: z.enum(["user", "tufti", "system"]),
  timestamp: z.date(),
  feedback: z.object({
    liked: z.boolean().optional(),
    reported: z.boolean().optional(),
    comment: z.string().optional()
  }).optional(),
  metadata: z.object({
    relevanceScore: z.number().optional(),
    sourceConfidence: z.number().optional(),
    cached: z.boolean().optional()
  }).optional()
})

export type Message = z.infer<typeof MessageSchema>