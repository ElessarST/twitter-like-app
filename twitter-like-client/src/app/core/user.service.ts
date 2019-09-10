import { Injectable } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { User } from '../models'
import { map } from 'rxjs/operators'
import { UserFragments } from './fragments'

const getCurrentUser = gql`
  {
    currentUser {
      ...UserFragment
      email
    }
  }
  ${UserFragments}
`

const getUser = gql`
  query user($username: String!) {
    user(username: $username) {
      ...UserFragment
    }
  }
  ${UserFragments}
`

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {
  }

  getCurrentUser() {
    return this.apollo
      .query<{ currentUser: User }>({
        query: getCurrentUser,
      })
      .pipe(map(resp => resp.data && resp.data.currentUser))
  }

  getUser(username: string) {
    return this.apollo
      .query<{ user: User }>({
        query: getUser,
        variables: { username },
      })
      .pipe(map(resp => resp.data.user ? resp.data.user : null))
  }
}
