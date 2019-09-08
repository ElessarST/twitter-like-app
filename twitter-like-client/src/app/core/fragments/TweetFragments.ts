import gql from 'graphql-tag'

export const TweetFragments = gql`
  fragment TweetFragment on Tweet {
    _id
    text
    photos
    createdAt
    likedBy {
      name
      username
      photoUrl
    }
    createdBy {
      name
      username
      photoUrl
    }
  }
`
