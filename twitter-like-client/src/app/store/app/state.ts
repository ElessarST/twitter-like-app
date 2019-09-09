import { RouterReducerState } from '@ngrx/router-store'

import { IAuthState, initialAuthState } from '../auth/state'
import { IFeedState, initialState as initialFeedState } from '../feed/state'
import { initialTweetState, ITweetState } from '../tweet/state'

export interface IAppState {
  router?: RouterReducerState
  auth: IAuthState
  feed: IFeedState
  tweet: ITweetState
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  feed: initialFeedState,
  tweet: initialTweetState,
}

export function getInitialState(): IAppState {
  return initialAppState
}
