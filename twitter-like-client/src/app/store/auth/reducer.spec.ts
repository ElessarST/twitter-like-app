import { reducer } from './reducer'
import { initialAuthState } from './state'
import * as AuthActions from './actions'
import { testUser } from '../../mocks'

describe('Auth Reducer', () => {
  it('should handle AuthActions.getCurrentUser', () => {
    const state = reducer(initialAuthState, AuthActions.getCurrentUser())
    expect(state).toEqual({
      ...initialAuthState,
      isFetchingCurrentUser: true,
    })
  })
  it('should handle AuthActions.getCurrentUserSuccess', () => {
    const state = reducer(
      { ...initialAuthState, isFetchingCurrentUser: true },
      AuthActions.getCurrentUserSuccess({ user: testUser })
    )
    expect(state).toEqual({
      ...initialAuthState,
      isFetchingCurrentUser: false,
      currentUser: testUser,
    })
  })
  it('should handle AuthActions.getCurrentUserError', () => {
    const state = reducer(
      { ...initialAuthState, isFetchingCurrentUser: true },
      AuthActions.getCurrentUserError()
    )
    expect(state).toEqual({
      ...initialAuthState,
      isFetchingCurrentUser: false,
    })
  })
  it('should handle AuthActions.logout', () => {
    const state = reducer({ ...initialAuthState, currentUser: testUser }, AuthActions.logout())
    expect(state).toEqual({
      ...initialAuthState,
      currentUser: null,
    })
  })
})
