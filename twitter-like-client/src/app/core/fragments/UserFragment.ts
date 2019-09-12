import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    name
    username
    photoUrl
    bio
  }
`

export const FullUserFragment = gql`
  fragment FullUserFragment on User {
    ...UserFragment
    followers {
      ...UserFragment
    }
    following {
      ...UserFragment
    }
  }
  ${UserFragment}
`
