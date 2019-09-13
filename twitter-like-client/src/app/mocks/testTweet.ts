import { Tweet } from '../models'
import { testUser } from './testUser'

export const testTweet: Tweet = {
  _id: '1',
  text: 'test text',
  photos: [],
  createdAt: 1,
  createdBy: testUser,
  retweetFrom: null,
  retweetsCount: 1,
  replyTo: null,
  replies: [],
  likedBy: []
}
