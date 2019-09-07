import { TweetService, UserService } from '../services'
import { ITweet } from '../database'
import GraphQLJSON from 'graphql-type-json'
import { createErrorResponse, createSuccessResponse } from '../utils/response'

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
  },
  Mutation: {
    createTweet: async (parent, args, context) => {
      const { text, photos } = args
      try {
        const newTweet = await TweetService.create({ text, photos }, context.user._id)
        return createSuccessResponse<ITweet>(newTweet)
      } catch (errors) {
        console.log(errors)
        return createErrorResponse('', errors)
      }
    },
  },
  JSON: GraphQLJSON,
}
