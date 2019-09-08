import gql from 'graphql-tag'

export const CommonFragments = gql`
  fragment ResponseFragment on MutationResponse {
    status
    error
    fieldErrors
  }
`
