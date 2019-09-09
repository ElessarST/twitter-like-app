import { createSelector } from '@ngrx/store'

import { IAppState } from '../app/state'
import { ITweetState } from './state'

const selectTweetState = (state: IAppState) => state.tweet

export const selectIsLoading = createSelector(
  selectTweetState,
  (state: ITweetState) => state.isLoading,
)

export const selectTweet = createSelector(
  selectTweetState,
  (state: ITweetState) => state.tweet,
)
