import { ITweet, IUser, TweetModel } from '../database'
import { Types } from 'mongoose'
import { Identifier } from '../database/Identifier'
import { UserService } from './index'
import { CreateTweetSchema } from './validationSchemas/tweetValidationsSchemas'
import { toObjectId } from '../utils/mongooseUtils'
import { LIMIT } from '../const'

async function findById(id: Identifier) {
  return TweetModel.findById(toObjectId(id)).exec()
}

async function findAll() {
  return TweetModel.find().exec()
}

async function getTweetsByCondition(condition, cursor) {
  const lastTime = cursor || new Date().getTime()
  return TweetModel.find({
    ...condition,
    createdAt: { $lt: lastTime },
  })
    .sort('-createdAt')
    .limit(LIMIT)
    .exec()
}

async function getFeed(user: IUser, cursor: number) {
  const { _id, following } = user
  return getTweetsByCondition({ createdBy: { $in: [_id, ...following].map(toObjectId) } }, cursor)
}

async function getFavorites(userId: Identifier, cursor) {
  return getTweetsByCondition({ likedBy: toObjectId(userId) }, cursor)
}

async function create(tweet: Partial<ITweet>, createdBy: string) {
  const validatedTweet = await CreateTweetSchema.validate(tweet, {
    abortEarly: false,
    stripUnknown: true,
  })
  const newTweet = new TweetModel({
    ...validatedTweet,
    likedBy: [],
    createdBy: new Types.ObjectId(createdBy),
    createdAt: new Date(),
  })
  return await newTweet.save()
}

async function toggleLike(tweetId: string, isLike: boolean, userId: string) {
  const operator = isLike ? '$addToSet' : '$pull'
  await TweetModel.updateOne(
    { _id: toObjectId(tweetId) },
    { [operator]: { likedBy: toObjectId(userId) } },
  ).exec()
  return findById(tweetId)
}

async function findRetweets(_id: Identifier) {
  return TweetModel.countDocuments({ retweetFrom: _id }).exec()
}

async function findReplies(_id: Identifier) {
  return TweetModel.find({ replyTo: _id }).exec()
}

async function findByUsername(username: string, cursor: number) {
  const user = await UserService.findByUsername(username)
  if (user) {
    return getTweetsByCondition({ createdBy: user._id }, cursor)
  }
  return []
}

export default {
  create,
  findById,
  findAll,
  toggleLike,
  findRetweets,
  findReplies,
  findByUsername,
  getFeed,
  getFavorites,
}
