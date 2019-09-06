import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar JSON

  type Tweet {
    text: String
    photos: [String]
    createdBy: User
    createdAt: Int
    favoritesCount: Int
    repostCount: Int
    replies: [Tweet]
    replyTo: [Tweet]
  }

  type User {
    username: String
    name: String
    email: String
    bio: String
    photoUrl: String
    followers: [User]
    following: [User]
    favorites: [Tweet]
    tweets: [Tweet]
  }

  type Query {
    currentUser: User
    feed: [Tweet]
  }
  
  type Mutation {
    createTweet(text: String!, photos: [String]): CreateTweetMutationResponse
  }
  
  interface MutationResponse {
    status: String!
    error: String
    fieldErrors: JSON
  }
  
  type CreateTweetMutationResponse implements MutationResponse {
    status: String!
    error: String
    fieldErrors: JSON
    data: Tweet
  }
`
