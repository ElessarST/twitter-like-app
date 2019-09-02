import * as mongoose from 'mongoose'

export interface IDBUser extends mongoose.Document {
  name: string
  email: string
  avatarURL: string
  password: string
  follows: string[]
  followers: string[]
}
