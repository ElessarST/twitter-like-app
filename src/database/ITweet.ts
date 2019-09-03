import { Document, model, Schema } from 'mongoose'

export interface ITweet extends Document {
  text: string
  photos: string[]
  replyTo?: string
  createdBy: Schema.Types.ObjectId
  createdAt: Date
}

const TweetSchema: Schema = new Schema({
  text: { type: String, required: true, unique: true },
  photos: [String],
  replyTo: Schema.Types.ObjectId,
  createdBy: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true },
})

export default model<ITweet>('Tweet', TweetSchema)
