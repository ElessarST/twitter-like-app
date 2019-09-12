import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  username: string
  email: string
  bio: string
  photoURL: string
  password: string
  salt: string
  following: string[]
  followers: string[]
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  bio: String,
  photoUrl: String,
  following: [String],
  followers: [String],
})

UserSchema.index({ name: 'text', username: 'text' })

export default mongoose.model<IUser>('User', UserSchema)
