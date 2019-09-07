import { User } from './User'

export type Tweet = {
  _id: string
  text: string
  photos: string[]
  createdAt: Date
  createdBy: User
}
