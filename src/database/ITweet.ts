import { Document, model, Schema, Types } from 'mongoose'

export interface ITweet extends Document {
  text: string
  photos: string[]
  replyTo?: string
  retweetFrom?: string
  likedBy?: string[]
  createdBy: Types.ObjectId
  createdAt: Date
}

const TweetSchema: Schema = new Schema({
  text: { type: String, required: true },
  photos: [String],
  likedBy: { type: [Schema.Types.ObjectId], required: true },
  replyTo: Schema.Types.ObjectId,
  retweetFrom: Schema.Types.ObjectId,
  createdBy: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true },
})

export default model<ITweet>('Tweet', TweetSchema)
