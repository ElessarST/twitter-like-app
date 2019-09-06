import { Injectable } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { User } from '../models/User'
import { map } from 'rxjs/operators'

const getCurrentUser = gql`
  {
    currentUser {
      name
      email
      photoUrl
    }
  }
`

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {
  }

  getCurrentUser() {
    return this.apollo
      .watchQuery<{ currentUser: User }>({
        query: getCurrentUser,
      })
      .valueChanges.pipe(map(resp => resp.data && resp.data.currentUser))
  }
}
