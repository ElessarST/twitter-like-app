import { Injectable } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { Response, User } from '../models'
import { map, switchMap } from 'rxjs/operators'
import { CommonFragments, UserFragment } from './fragments'
import { Observable } from 'rxjs'
import { FullUserFragment } from './fragments/UserFragment'
import { checkError } from '../utils/response'

const getCurrentUser = gql`
  {
    currentUser {
      ...FullUserFragment
      email
    }
  }
  ${FullUserFragment}
`

const getUser = gql`
  query user($username: String!) {
    user(username: $username) {
      ...FullUserFragment
    }
  }
  ${FullUserFragment}
`

const searchUser = gql`
  query search($query: String!) {
    search(query: $query) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

const editProfile = gql`
  mutation editProfile($profile: EditProfileInput!) {
    editProfile(profile: $profile) {
      ...ResponseFragment
      data {
        ...FullUserFragment
      }
    }
  }
  ${FullUserFragment}
  ${CommonFragments}
`

const follow = gql`
  mutation follow($userId: String!) {
    follow(userId: $userId) {
      ...ResponseFragment
      data {
        ...FullUserFragment
      }
    }
  }
  ${FullUserFragment}
  ${CommonFragments}
`

const unfollow = gql`
  mutation unfollow($userId: String!) {
    unfollow(userId: $userId) {
      ...ResponseFragment
      data {
        ...FullUserFragment
      }
    }
  }
  ${FullUserFragment}
  ${CommonFragments}
`

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getCurrentUser(): Observable<User> {
    return this.apollo
      .query<{ currentUser: User }>({
        query: getCurrentUser,
      })
      .pipe(map(resp => resp.data && resp.data.currentUser))
  }

  getUser(username: string): Observable<User> {
    return this.apollo
      .query<{ user: User }>({
        query: getUser,
        variables: { username },
      })
      .pipe(map(resp => (resp.data.user ? resp.data.user : null)))
  }

  searchUsers(query: string): Observable<User[]> {
    return this.apollo
      .query<{ search: User[] }>({
        query: searchUser,
        variables: { query },
      })
      .pipe(map(resp => resp.data.search))
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
        switchMap(checkError)
      )
  }

  follow(user: User): Observable<Response<User>> {
    return this.apollo
      .mutate<{ follow: Response<User> }>({
        mutation: follow,
        variables: { userId: user._id },
      })
      .pipe(
        map(result => result.data.follow),
        switchMap(checkError)
      )
  }

  unfollow(user: User): Observable<Response<User>> {
    return this.apollo
      .mutate<{ unfollow: Response<User> }>({
        mutation: unfollow,
        variables: { userId: user._id },
      })
      .pipe(
        map(result => result.data.unfollow),
        switchMap(checkError)
      )
  }
}
