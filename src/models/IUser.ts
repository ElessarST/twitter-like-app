import { IModel } from './IModel'

export interface IUser extends IModel {
  name: string
  email: string
  avatarURL: string
  friends: IUser[]
}
