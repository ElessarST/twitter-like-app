import { ITweet, TweetModel } from '../database'
import { Types } from 'mongoose'

async function findById(id: string) {
  return TweetModel.findById(new Types.ObjectId(id)).exec()
}

async function findAll() {
  return TweetModel.find().exec()
}

async function create(tweet: Partial<ITweet>, createdBy: string) {
  const newTweet = new TweetModel({
    ...tweet,
    createdBy: new Types.ObjectId(createdBy),
    createdAt: new Date(),
  })
  return await newTweet.save()
}

export default {
  create,
  findById,
  findAll,
}
