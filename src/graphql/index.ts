import { TweetService, UserService } from '../services'
import { ITweet } from '../database'

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
  },
  Mutation: {
    createTweet: async (parent, args, context) => {
      const { text, photos } = args
      const newTweet = await TweetService.create({ text, photos }, context.user._id)
      return newTweet.toObject()
    },
  },
}
