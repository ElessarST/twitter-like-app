import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  username: string
  email: string
  bio: string
  photoURL: string
  password: string
  salt: string
  follows: string[]
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
  follows: [String],
  followers: [String],
})

export default mongoose.model<IUser>('User', UserSchema)
