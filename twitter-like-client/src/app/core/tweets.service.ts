import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Response, Tweet } from '../models'
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { CommonFragments, TweetFragments } from './fragments'
import { checkError } from '../utils/response'

const createTweet = gql`
  mutation createTweet($tweet: TweetInput!) {
    createTweet(tweet: $tweet) {
      ...ResponseFragment
      data {
        ...TweetFragment
      }
    }
  }
  ${TweetFragments}
  ${CommonFragments}
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

const getTweets = gql`
  query {
    feed {
      ...TweetFragment
    }
  }
  ${TweetFragments}
`

const getTweetsByUsername = gql`
  query tweets($username: String!) {
    tweets(username: $username) {
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
        variables: { tweet: { text, photos, retweetFrom, replyTo } },
      })
      .pipe(
        map(result => result.data),
        map(result => result.createTweet),
        switchMap(checkError),
      )
  }

  getFeed(): Observable<Tweet[]> {
    return this.apollo
      .query<{ feed: Tweet[] }>({
        query: getTweets,
      })
      .pipe(map(result => result.data.feed))
  }

  getTweetsByUser(username: string): Observable<Tweet[]> {
    return this.apollo
      .query<{ tweets: Tweet[] }>({
        query: getTweetsByUsername,
        variables: { username },
      })
      .pipe(map(result => result.data.tweets))
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
        switchMap(checkError),
      )
  }
}
