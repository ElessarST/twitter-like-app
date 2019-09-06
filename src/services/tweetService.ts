import { ITweet, TweetModel } from '../database'
import { Types } from 'mongoose'
import * as yup from 'yup'

async function findById(id: string) {
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
})

async function create(tweet: Partial<ITweet>, createdBy: string) {
  await CreateTweetSchema.validate(tweet, { abortEarly: false })
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
