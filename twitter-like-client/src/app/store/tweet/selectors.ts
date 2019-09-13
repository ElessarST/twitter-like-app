import { createSelector } from '@ngrx/store'
import { orderBy } from 'lodash'
import { IAppState } from '../app/state'
import { ITweetState } from './state'
import { Tweet } from '../../models'

const selectTweetState = (state: IAppState) => state.tweet

export const selectIsLoading = createSelector(
  selectTweetState,
  (state: ITweetState) => state.isLoading
)

export const selectTweet = createSelector(
  selectTweetState,
  (state: ITweetState) => state.tweet
)

export const selectReplies = createSelector(
  selectTweet,
  (tweet: Tweet) => (tweet ? orderBy(tweet.replies || [], t => -t.createdAt) : [])
)
