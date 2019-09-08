import { IUser, UserModel } from '../database'
import { Types } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { Identifier } from '../database/Identifier'

function findById(id: Identifier): Promise<IUser> {
  return UserModel.findById(new Types.ObjectId(id)).exec()
}

function findByIds(ids: Identifier[]): Promise<IUser[]> {
  return UserModel.find({ _id: { $in: ids.map(id => new Types.ObjectId(id)) } }).exec()
}

function findByEmail(email: string): Promise<IUser> {
  return UserModel.findOne({ email }).exec()
}

function findByUsername(username: string): Promise<IUser> {
  return UserModel.findOne({ username }).exec()
}

async function createUser({ password, ...user }: Partial<IUser>) {
  const salt = bcrypt.genSaltSync()
  const newUser = new UserModel({ ...user, password: bcrypt.hashSync('password', salt), salt })
  return await newUser.save()
}

export default {
  findByEmail,
  findById,
  findByIds,
  findByUsername,
  createUser,
}
