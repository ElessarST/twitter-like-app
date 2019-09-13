import { createReducer, on } from '@ngrx/store'
import { IAuthState, initialAuthState } from './state'
import * as AuthActions from './actions'

const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.getCurrentUser, state => ({ ...state, isFetchingCurrentUser: true })),
  on(AuthActions.getCurrentUserSuccess, (state, { user }) => ({
    ...state,
    isFetchingCurrentUser: false,
    currentUser: user,
  })),
  on(AuthActions.getCurrentUserError, state => ({ ...state, isFetchingCurrentUser: false })),
  on(AuthActions.logout, state => ({ ...state, currentUser: null }))
)

export function reducer(state: IAuthState, action) {
  return authReducer(state, action)
}
