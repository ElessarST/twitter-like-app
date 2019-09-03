import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

const createTweet = gql`
  mutation createTweet($text: String!, $photos: [String]) {
    createTweet(text: $text, photos: $photos) {
      text
      photos
    }
  }
`

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  constructor(private apollo: Apollo) {
  }

  createTweet(text: string, photos: string[]) {
    return this.apollo
      .mutate({
        mutation: createTweet,
        variables: { text, photos },
      })
  }
}
