import { AuthActions, AuthActionType } from './actions'
import { IAuthState, initialAuthState } from './state'

export const authReducer = (state = initialAuthState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthActionType.GetCurrentUser: {
      return {
        ...state,
        isFetchingCurrentUser: true,
      }
    }
    case AuthActionType.GetCurrentUserSuccess: {
      return {
        ...state,
        isFetchingCurrentUser: false,
        currentUser: action.payload,
      }
    }
    case AuthActionType.GetCurrentUserError: {
      return {
        ...state,
        isFetchingCurrentUser: false,
      }
    }
    case AuthActionType.Logout: {
      return {
        ...state,
        currentUser: null,
      }
    }
    default:
      return state
  }
}
