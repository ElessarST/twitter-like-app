import { adapter, initialState } from './state'
import { createReducer, on } from '@ngrx/store'
import * as FeedActions from './actions'

export const feedReducer = createReducer(
  initialState,
  on(FeedActions.getFeed, state => ({ ...state, isLoading: true })),
  on(FeedActions.getFeedError, state => ({ ...state, isLoading: false })),
  on(FeedActions.getFeedSuccess, (state, { tweets }) => ({
    ...adapter.addAll(tweets, state),
    isLoading: false,
  })),
  on(FeedActions.addTweet, (state, { tweet }) => adapter.addOne(tweet, state)),
)
