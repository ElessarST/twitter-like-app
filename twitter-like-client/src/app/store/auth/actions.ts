import { createAction, props } from '@ngrx/store'
import { User } from '../../models'

export enum AuthActionType {
  GetCurrentUser = '[Auth] Get Current User',
  GetCurrentUserSuccess = '[Auth] Get Current User Success',
  GetCurrentUserError = '[Auth] Get Current User Error',
  Logout = '[Auth] Logout User',
}

export const getCurrentUser = createAction(AuthActionType.GetCurrentUser)
export const getCurrentUserSuccess = createAction(
  AuthActionType.GetCurrentUserSuccess,
  props<{ user: User }>()
)
export const getCurrentUserError = createAction(AuthActionType.GetCurrentUserError)
export const logout = createAction(AuthActionType.Logout)
