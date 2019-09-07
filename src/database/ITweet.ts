import { Document, model, Schema, Types } from 'mongoose'

export interface ITweet extends Document {
  text: string
  photos: string[]
  replyTo?: string
  createdBy: Types.ObjectId
  createdAt: Date
}

const TweetSchema: Schema = new Schema({
  text: { type: String, required: true },
  photos: [String],
  replyTo: Schema.Types.ObjectId,
  createdBy: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true },
})

export default model<ITweet>('Tweet', TweetSchema)
