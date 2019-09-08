import { TweetService, UserService } from '../services'
import { ITweet } from '../database'
import GraphQLJSON from 'graphql-type-json'
import { createErrorResponse, createSuccessResponse } from '../utils/response'

function getUserId(context) {
  return context.user._id
}

export const resolvers = {
  Query: {
    currentUser: (parent, args, context) => context.user,
    feed: () => TweetService.findAll(),
  },
  Tweet: {
    async createdBy(tweet: ITweet) {
      const user = await UserService.findById(tweet.createdBy)
      return user.toObject()
    },
    createdAt(tweet: ITweet) {
      return tweet.createdAt.getTime()
    },
    likedBy({ likedBy = [] }: ITweet) {
      return likedBy.length > 0 ? UserService.findByIds(likedBy) : []
    },
  },
  Mutation: {
    createTweet: async (parent, args, context) => {
      const { text, photos } = args
      try {
        const newTweet = await TweetService.create({ text, photos }, getUserId(context))
        return createSuccessResponse<ITweet>(newTweet)
      } catch (errors) {
        return createErrorResponse('There was an error while creating tweet', errors)
      }
    },
    likeTweet: async (parent, args, context) => {
      try {
        const { tweetId, isLike } = args
        const tweet = await TweetService.toggleLike(tweetId, isLike, getUserId(context))
        return createSuccessResponse<ITweet>(tweet)
      } catch (errors) {
        return createErrorResponse('', errors)
      }
    }
  },
  JSON: GraphQLJSON,
}
