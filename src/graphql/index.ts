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
    tweet: (parent, args) => TweetService.findById(args.tweetId),
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
    async retweetFrom(tweet: ITweet) {
      if (!tweet.retweetFrom) {
        return null
      }
      return TweetService.findById(tweet.retweetFrom)
    },
    async replyTo(tweet: ITweet) {
      if (!tweet.replyTo) {
        return null
      }
      return TweetService.findById(tweet.replyTo)
    },
    async retweetsCount(tweet: ITweet) {
      return TweetService.findRetweets(tweet._id)
    },
    async replies(tweet: ITweet) {
      return TweetService.findReplies(tweet._id) || []
    },
  },
  Mutation: {
    createTweet: async (parent, args, context) => {
      const { text, photos, retweetFrom, replyTo } = args
      try {
        const newTweet = await TweetService.create(
          { text, photos, retweetFrom, replyTo },
          getUserId(context),
        )
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
    },
  },
  JSON: GraphQLJSON,
}
