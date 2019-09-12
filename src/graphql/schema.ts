import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar JSON
  scalar Date

  type Tweet {
    _id: String
    text: String
    photos: [String]
    createdBy: User
    createdAt: Date
    favoritesCount: Int
    likedBy: [User]
    replies: [Tweet]
    replyTo: Tweet
    retweetsCount: Int
    retweetFrom: Tweet
  }

  type User {
    _id: String
    username: String!
    name: String!
    email: String!
    bio: String
    photoUrl: String
    followers: [User]
    following: [User]
    tweets: [Tweet]
  }

  type Query {
    currentUser: User
    user(username: String!): User
    feed: [Tweet]
    tweet(tweetId: String!): Tweet
    tweets(username: String!): [Tweet]
    favorites: [Tweet]
  }

  type Mutation {
    createTweet(tweet: TweetInput!): TweetMutationResponse
    likeTweet(tweetId: String!, isLike: Boolean): TweetMutationResponse
    editProfile(profile: EditProfileInput): UserMutationResponse
    follow(userId: String!): UserMutationResponse
    unfollow(userId: String!): UserMutationResponse
  }
  
  input EditProfileInput {
    name: String!
    username: String!
    photoUrl: String
    bio: String
  }

  input TweetInput {
    text: String!
    photos: [String]
    retweetFrom: String
    replyTo: String
  }

  interface MutationResponse {
    status: String!
    error: String
    fieldErrors: JSON
  }

  type TweetMutationResponse implements MutationResponse {
    status: String!
    error: String
    fieldErrors: JSON
    data: Tweet
  }

  type UserMutationResponse implements MutationResponse {
    status: String!
    error: String
    fieldErrors: JSON
    data: User
  }
`
