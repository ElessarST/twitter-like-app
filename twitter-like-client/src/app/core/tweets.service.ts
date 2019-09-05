import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Tweet } from '../models/Tweet'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

const createTweet = gql`
  mutation createTweet($text: String!, $photos: [String]) {
    createTweet(text: $text, photos: $photos) {
      text
      photos
    }
  }
`

const getTweets = gql`
  query {
    feed {
      text
      photos
      createdAt
      createdBy {
        name
        username
        photoUrl
      }
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
    return this.apollo.mutate({
      mutation: createTweet,
      variables: { text, photos },
    })
  }

  getTweets(): Observable<Tweet[]> {
    return this.apollo
      .query<{ feed: Tweet[] }>({
        query: getTweets,
      })
      .pipe(map(result => result.data.feed))
  }
}
