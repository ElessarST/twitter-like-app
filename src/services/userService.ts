import { IUser, UserModel } from '../database'
import { Types } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { Identifier } from '../database/Identifier'
import { ProfileSchema, SignUpSchema } from './validationSchemas/userValidationSchemas'
import { toObjectId } from '../utils/mongooseUtils'

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

async function createUser({ password, ...userFields }: Partial<IUser>) {
  const user = await SignUpSchema.validate(userFields, { abortEarly: false, stripUnknown: true })
  const salt = bcrypt.genSaltSync()
  const newUser = new UserModel({ ...user, password: bcrypt.hashSync('password', salt), salt })
  return await newUser.save()
}

async function updateProfile(profileField: Partial<IUser>, userId: Identifier) {
  const profile = await ProfileSchema.validate(profileField, {
    abortEarly: false,
    stripUnknown: true,
    context: { userId },
  })
  await UserModel.updateOne({ _id: toObjectId(userId) }, { $set: profile }).exec()
  return findById(userId)
}

async function changeFollowing(userId: Identifier, currentUserId: Identifier, isFollow: boolean) {
  const operation = isFollow ? '$addToSet' : '$pull'
  await Promise.all([
    UserModel.updateOne(
      { _id: toObjectId(userId) },
      { [operation]: { followers: currentUserId } },
    ).exec(),
    UserModel.updateOne(
      { _id: toObjectId(currentUserId) },
      { [operation]: { following: userId } },
    ).exec(),
  ])
  return findById(currentUserId)
}

async function follow(userId: Identifier, currentUserId: Identifier) {
  return changeFollowing(userId, currentUserId, true)
}

async function unfollow(userId: Identifier, currentUserId: Identifier) {
  return changeFollowing(userId, currentUserId, false)
}

async function searchUser(query: string) {
  return UserModel.find({ $text: { $search: query } }).exec()
}

export default {
  findByEmail,
  findById,
  findByIds,
  findByUsername,
  createUser,
  updateProfile,
  follow,
  unfollow,
  searchUser,
}
