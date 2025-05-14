import { type User } from './User'

export interface EmotionSummary {
  name: string
  value: number
  color: string
}

export interface Emotion {
  id: number
  name: string
}

export interface Thought {
  id?: number
  thought: string
  emotionId: number
  emotion?: Emotion
  user?: User
  userId: number
  createdAt: Date // ISO date string
}
