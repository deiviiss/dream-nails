import { type User } from './User'

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
