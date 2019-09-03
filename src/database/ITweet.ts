import * as mongoose from 'mongoose'

export interface ITweet extends mongoose.Document {
  text: string
  createdBy: string
  createdAt: Date
}
