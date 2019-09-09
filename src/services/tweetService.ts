import { ITweet, TweetModel } from '../database'
import { Types } from 'mongoose'
import * as yup from 'yup'
import { Identifier } from '../database/Identifier'

const toObjectId = (id: string): Types.ObjectId => new Types.ObjectId(id)

async function findById(id: Identifier) {
  return TweetModel.findById(new Types.ObjectId(id)).exec()
}

async function findAll() {
  return TweetModel.find().exec()
}

const CreateTweetSchema = yup.object().shape({
  text: yup
    .string()
    .required()
    .test('max-tweet-len', 'Tweet text length can be larger than 256', val => val.length <= 256),
  photos: yup.array().of(yup.string()),
  retweetFrom: yup.string(),
  replyTo: yup.string(),
})

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

export default {
  create,
  findById,
  findAll,
  toggleLike,
  findRetweets,
  findReplies,
}
