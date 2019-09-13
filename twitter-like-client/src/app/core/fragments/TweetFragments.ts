import gql from 'graphql-tag'
import { UserFragment } from './UserFragment'

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
  ${UserFragment}
`

export const TweetFragments = gql`
  fragment TweetFragment on Tweet {
    ...ShortTweetInfoFragment
    likedBy {
      ...UserFragment
    }
    createdBy {
      ...UserFragment
    }
    retweetsCount
    retweetFrom {
      ...ShortTweetInfoFragment
    }
    replyTo {
      ...ShortTweetInfoFragment
    }
    replies {
      ...ShortTweetInfoFragment
    }
  }
  ${ShortTweetInfoFragment}
  ${UserFragment}
`
