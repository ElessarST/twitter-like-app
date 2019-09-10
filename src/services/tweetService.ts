import { ITweet, TweetModel } from '../database'
import { Types } from 'mongoose'
import { Identifier } from '../database/Identifier'
import { UserService } from './index'
import { CreateTweetSchema } from './validationSchemas/tweetValidationsSchemas'
import { toObjectId } from '../utils/mongooseUtils'

async function findById(id: Identifier) {
  return TweetModel.findById(toObjectId(id)).exec()
}

async function findAll() {
  return TweetModel.find().exec()
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
  return TweetModel.count({ retweetFrom: _id }).exec()
}

async function findReplies(_id: Identifier) {
  return TweetModel.find({ replyTo: _id }).exec()
}

async function findByUsername(username: string) {
  const user = await UserService.findByUsername(username)
  if (user) {
    return TweetModel.find({ createdBy: user._id }).exec()
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
}
