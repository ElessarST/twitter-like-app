import { gql } from 'apollo-server-express'

export const typeDefs = gql`
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
    users: [User]
    currentUser: User
  }
  
  type Mutation {
    createTweet(text: String!, photos: [String]): Tweet
  }
`
