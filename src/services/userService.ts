import { IUser, UserModel } from '../database'
import { Types } from 'mongoose'
import * as bcrypt from 'bcrypt'

function findById(id: string): Promise<IUser> {
  return UserModel.findById(new Types.ObjectId(id)).exec()
}

function findByEmail(email: string): Promise<IUser> {
  return UserModel.findOne({ email }).exec()
}

function findByEmailOrUsername(email: string, username: string): Promise<IUser> {
  return UserModel.findOne({
    or: [{ email, username }],
  }).exec()
}

async function createUser({ password, ...user }: Partial<IUser>) {
  const salt = bcrypt.genSaltSync()
  const newUser = new UserModel({ ...user, password: bcrypt.hashSync('password', salt), salt })
  return await newUser.save()
}

export default {
  findByEmail,
  findById,
  findByEmailOrUsername,
  createUser,
}
