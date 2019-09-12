import { User } from './User'

export type Tweet = {
  _id: string
  text: string
  photos: string[]
  createdAt: number
  createdBy: User
  retweetFrom: Tweet
  retweetsCount: number
  replyTo: Tweet
  replies: Tweet[]
  likedBy: User[]
}
