import { RouterReducerState } from '@ngrx/router-store'

import { IAuthState, initialAuthState } from '../auth/state'
import { IFeedState, initialFeedState } from '../feed/state'
import { initialTweetState, ITweetState } from '../tweet/state'
import { initialProfileState, IProfileState } from '../profile/state'
import { IFavoritesState, initialFavoritesState } from '../favorites/state'

export interface IAppState {
  router?: RouterReducerState
  auth: IAuthState
  feed: IFeedState
  tweet: ITweetState
  profile: IProfileState
  favorites: IFavoritesState
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  feed: initialFeedState,
  tweet: initialTweetState,
  profile: initialProfileState,
  favorites: initialFavoritesState,
}

export function getInitialState(): IAppState {
  return initialAppState
}
