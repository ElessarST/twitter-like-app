import { createReducer, on } from '@ngrx/store'
import { initialAuthState } from './state'
import * as AuthActions from './actions'

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.getCurrentUser, state => ({ ...state, isFetchingCurrentUser: true })),
  on(AuthActions.getCurrentUserSuccess, (state, user) => ({
    ...state,
    isFetchingCurrentUser: false,
    currentUser: user,
  })),
  on(AuthActions.getCurrentUserError, (state) => ({ ...state, isFetchingCurrentUser: false })),
  on(AuthActions.logout, (state) => ({ ...state, currentUser: null })),
)
