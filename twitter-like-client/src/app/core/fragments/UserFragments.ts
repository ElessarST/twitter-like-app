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

export const FullUserFragments = gql`
  fragment FullUserFragment on User {
    ...UserFragment
    followers {
      ...UserFragment
    }
    following {
      ...UserFragment
    }
  }
  ${UserFragments}
`
