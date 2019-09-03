import { IModel } from './IModel'

export interface IUser extends IModel {
  name: string
  email: string
  photoUrl: string
  friends?: IUser[]
}
