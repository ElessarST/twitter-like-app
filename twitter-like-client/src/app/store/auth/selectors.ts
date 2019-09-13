import { createSelector } from '@ngrx/store'

import { IAppState } from '../app/state'
import { IAuthState } from './state'

const selectAuth = (state: IAppState) => state.auth

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: IAuthState) => !!state.currentUser
)

export const selectIsFetchingCurrentUser = createSelector(
  selectAuth,
  (state: IAuthState) => state.isFetchingCurrentUser
)

export const selectCurrentUser = createSelector(
  selectAuth,
  (state: IAuthState) => state.currentUser
)
