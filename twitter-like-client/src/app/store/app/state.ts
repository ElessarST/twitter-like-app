import { RouterReducerState } from '@ngrx/router-store'

import { IAuthState, initialAuthState } from '../auth/state'
import { IFeedState, initialState as initialFeedState } from '../feed/state'

export interface IAppState {
  router?: RouterReducerState
  auth: IAuthState
  feed: IFeedState
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  feed: initialFeedState,
}

export function getInitialState(): IAppState {
  return initialAppState
}
