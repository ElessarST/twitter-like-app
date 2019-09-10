import { createReducer, on } from '@ngrx/store'
import { initialTweetState } from './state'
import * as TweetActions from './actions'

export const tweetReducer = createReducer(
  initialTweetState,
  on(TweetActions.getTweet, state => ({ ...state, isLoading: true })),
  on(TweetActions.getTweetSuccess, (state, { tweet }) => ({ ...state, tweet, isLoading: false })),
  on(TweetActions.getTweetError, state => ({ ...state, isLoading: false })),
  on(TweetActions.updateTweet, (state, { tweet }) => ({ ...state, tweet })),
)
