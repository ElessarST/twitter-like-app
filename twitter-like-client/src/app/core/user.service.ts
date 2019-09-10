import { Injectable } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { Response, ResponseStatus, User } from '../models'
import { map, switchMap } from 'rxjs/operators'
import { CommonFragments, UserFragments } from './fragments'
import { Observable, of, throwError } from 'rxjs'

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

const editProfile = gql`
  mutation editProfile($profile: EditProfileInput!) {
    editProfile(profile: $profile) {
      ...ResponseFragment
      data {
        ...UserFragment
      }
    }
  }
  ${UserFragments}
  ${CommonFragments}
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

  editProfile(profile: User): Observable<Response<User>> {
    return this.apollo
      .mutate<{ editProfile: Response<User> }>({
        mutation: editProfile,
        variables: { profile },
      })
      .pipe(
        map(result => result.data),
        map(result => result.editProfile),
        switchMap(data => {
          if (data.status === ResponseStatus.Error) {
            return throwError(data)
          }
          return of(data)
        }),
      )
  }
}
