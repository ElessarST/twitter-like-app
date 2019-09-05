import { User } from './User'

export type Tweet = {
  text: string
  photos: string[]
  createdAt: Date
  createdBy: User
}
