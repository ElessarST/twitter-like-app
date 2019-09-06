import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Response, ResponseStatus, Tweet } from '../models'
import { map, switchMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

const createTweet = gql`
  mutation createTweet($text: String!, $photos: [String]) {
    createTweet(text: $text, photos: $photos) {
      status
      error
      fieldErrors
      data {
        text
        photos
      }
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

  createTweet(text: string, photos: string[]): Observable<Response<Tweet>> {
    return this.apollo.mutate<{ createTweet: Response<Tweet> }>({
      mutation: createTweet,
      variables: { text, photos },
    }).pipe(
      map(result => result.data),
      map(result => result.createTweet),
      switchMap(data => {
        if (data.status === ResponseStatus.Error) {
          return throwError(data)
        }
        return of(data)
      }),
    )
  }

  getTweets(): Observable<Tweet[]> {
    return this.apollo
      .query<{ feed: Tweet[] }>({
        query: getTweets,
      })
      .pipe(map(result => result.data.feed))
  }
}
