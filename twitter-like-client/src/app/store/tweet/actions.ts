import { createAction, props } from '@ngrx/store'
import { Tweet } from '../../models'

export enum TweetActionType {
  GetTweet = '[Tweet] Get Current Tweet',
  GetTweetSuccess = '[Tweet] Get Current Tweet Success',
  GetTweetError = '[Tweet] Get Current Tweet Error',
}

export const getTweet = createAction(TweetActionType.GetTweet, props<{ tweetId: string }>())
export const getTweetSuccess = createAction(TweetActionType.GetTweetSuccess, props<Tweet>())
export const getTweetError = createAction(TweetActionType.GetTweetError, props<{}>())
