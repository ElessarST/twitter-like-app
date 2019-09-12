import { TweetService, UserService } from '../services'
import { ITweet, IUser } from '../database'
import GraphQLJSON from 'graphql-type-json'
import { createErrorResponse, createSuccessResponse } from '../utils/response'
import { ApolloError } from 'apollo-server-core'

function getCurrentUserId(context) {
  return context.user._id
}

function checkRequired(data, message) {
  if (!data) {
    throw new ApolloError(message, 'NOT_FOUND')
  }
  return data
}

export const resolvers = {
  Query: {
    currentUser: (parent, args, context) => context.user,
    feed: (parent, args, context) => TweetService.getFeed(context.user),
    user: async (parent, { username }) =>
      checkRequired(await UserService.findByUsername(username), 'User Not Found'),
    tweet: async (parent, { tweetId }) =>
      checkRequired(await TweetService.findById(tweetId), 'Tweet Not Found'),
    tweets: (parent, { username }) => TweetService.findByUsername(username),
    favorites: (parent, args, context) => TweetService.getFavorites(getCurrentUserId(context)),
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
  User: {
    async following({ following = [] }: IUser) {
      return following ? UserService.findByIds(following) : []
    },
    async followers({ followers }: IUser) {
      return followers ? UserService.findByIds(followers) : []
    },
  },
  Mutation: {
    createTweet: async (parent, { tweet }, context) => {
      try {
        const newTweet = await TweetService.create(tweet, getCurrentUserId(context))
        return createSuccessResponse<ITweet>(newTweet)
      } catch (errors) {
        return createErrorResponse('There was an error while creating tweet', errors)
      }
    },
    likeTweet: async (parent, { tweetId, isLike }, context) => {
      try {
        const tweet = await TweetService.toggleLike(tweetId, isLike, getCurrentUserId(context))
        return createSuccessResponse<ITweet>(tweet)
      } catch (errors) {
        return createErrorResponse('', errors)
      }
    },
    editProfile: async (parent, { profile }, context) => {
      try {
        const user = await UserService.updateProfile(profile, getCurrentUserId(context))
        return createSuccessResponse<IUser>(user)
      } catch (errors) {
        return createErrorResponse('', errors)
      }
    },
    follow: async (parent, { userId }, context) => {
      try {
        const user = await UserService.follow(userId, getCurrentUserId(context))
        return createSuccessResponse<IUser>(user)
      } catch (errors) {
        return createErrorResponse('', errors)
      }
    },
    unfollow: async (parent, { userId }, context) => {
      try {
        const user = await UserService.unfollow(userId, getCurrentUserId(context))
        return createSuccessResponse<IUser>(user)
      } catch (errors) {
        return createErrorResponse('', errors)
      }
    },
  },
  JSON: GraphQLJSON,
}
