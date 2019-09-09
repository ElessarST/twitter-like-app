import gql from 'graphql-tag'
import { UserFragments } from './UserFragments'

export const ShortTweetInfoFragment = gql`
  fragment ShortTweetInfoFragment on Tweet {
    _id
    text
    photos
    createdAt
    createdBy {
      ...UserFragment
    }
  }
  ${UserFragments}
`

export const TweetFragments = gql`
  fragment TweetFragment on Tweet {
    ...ShortTweetInfoFragment
    likedBy {
      name
      username
      photoUrl
    }
    createdBy {
      ...UserFragment
    }
    retweetsCount
    retweetFrom {
      ...ShortTweetInfoFragment
    }
    replyTo{
      ...ShortTweetInfoFragment
    }
    replies {
      ...ShortTweetInfoFragment
    }
  }
  ${ShortTweetInfoFragment}
  ${UserFragments}
`
