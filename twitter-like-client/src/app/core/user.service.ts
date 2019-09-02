import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular'
import { User } from '../models/User'

const getCurrentUser = gql`
{
  currentUser {
    name
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  getCurrentUser() {
    return this.apollo
      .query<{ currentUser: User }>({
        query: getCurrentUser,
      })
  }
}
