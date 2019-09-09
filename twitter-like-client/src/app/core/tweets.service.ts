import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Response, ResponseStatus, Tweet } from '../models'
import { map, switchMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'
import { CommonFragments, TweetFragments } from './fragments'

const createTweet = gql`
  mutation createTweet($text: String!, $photos: [String], $retweetFrom: String, $replyTo: String) {
    createTweet(text: $text, photos: $photos, retweetFrom: $retweetFrom, replyTo: $replyTo) {
      ...ResponseFragment
      data {
        ...TweetFragment
      }
    }
  }
  ${TweetFragments}
  ${CommonFragments}
`

const getTweets = gql`
  query {
    feed {
      ...TweetFragment
    }
  }
  ${TweetFragments}
`

const getTweetById = gql`
  query tweet($tweetId: String!) {
    tweet(tweetId: $tweetId) {
      ...TweetFragment
    }
  }
  ${TweetFragments}
`

const likeTweet = gql`
  mutation likeTweet($tweetId: String!, $isLike: Boolean) {
    likeTweet(tweetId: $tweetId, isLike: $isLike) {
      ...ResponseFragment
      data {
        ...TweetFragment
      }
    }
  }
  ${TweetFragments}
  ${CommonFragments}
`

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  constructor(private apollo: Apollo) {
  }

  createTweet(
    text: string,
    photos: string[],
    retweetFrom?: string,
    replyTo?: string,
  ): Observable<Response<Tweet>> {
    return this.apollo
      .mutate<{ createTweet: Response<Tweet> }>({
        mutation: createTweet,
        variables: { text, photos, retweetFrom, replyTo },
      })
      .pipe(
        map(result => result.data),
        map(result => result.createTweet),
        switchMap(data => {
          if (data.status === ResponseStatus.Error) {
            return throwError(data)
          }
          return of(data)
        })
      )
  }

  getTweets(): Observable<Tweet[]> {
    return this.apollo
      .query<{ feed: Tweet[] }>({
        query: getTweets,
      })
      .pipe(map(result => result.data.feed))
  }

  getTweetById(tweetId: string): Observable<Tweet> {
    return this.apollo
      .query<{ tweet: Tweet }>({
        query: getTweetById,
        variables: { tweetId },
      })
      .pipe(map(result => result.data.tweet))
  }

  likeTweet(tweetId: string, isLike: boolean): Observable<Response<Tweet>> {
    return this.apollo
      .mutate<{ likeTweet: Response<Tweet> }>({
        mutation: likeTweet,
        variables: { tweetId, isLike },
      })
      .pipe(
        map(result => result.data),
        map(result => result.likeTweet),
        switchMap(data => {
          if (data.status === ResponseStatus.Error) {
            return throwError(data)
          }
          return of(data)
        })
      )
  }
}
