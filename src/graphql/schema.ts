import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Post {
    text: [Vote]
    photos: [String]
    createdBy: User
    favoritesCount: Int
    repostCount: Int
    comments: [Comment]
    tags: [String]
    replies: [Post]
  }

  type User {
    username: String
    name: String
    email: String
    photoUrl: String
    followers: [User]
    following: [Vote]
    favorites: [Post]
    post: [Post]
  }

  type Query {
    users: [User]
    currentUser: User
  }
`
