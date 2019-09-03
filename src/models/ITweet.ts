import { IModel } from './IModel'
import { IUser } from './IUser'

export interface ITweet extends IModel {
  text: string
  photos: string[]
  replyTo?: ITweet
  createdBy: IUser
  createdAt: Date
}
