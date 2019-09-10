import gql from 'graphql-tag'

export const UserFragments = gql`
  fragment UserFragment on User {
    _id
    name
    username
    photoUrl
    bio
  }
`
