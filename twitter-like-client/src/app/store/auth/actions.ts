import { Action } from '@ngrx/store'
import { User } from '../../models'

export enum AuthActionType {
  GetCurrentUser = '[Auth] Get Current User',
  GetCurrentUserSuccess = '[Auth] Get Current User Success',
  GetCurrentUserError = '[Auth] Get Current User Error',
  Logout = '[Auth] Logout User',
}

export class GetCurrentUser implements Action {
  public readonly type = AuthActionType.GetCurrentUser
}

export class GetCurrentUserSuccess implements Action {
  public readonly type = AuthActionType.GetCurrentUserSuccess

  constructor(public payload: User) {
  }
}

export class GetCurrentUserError implements Action {
  public readonly type = AuthActionType.GetCurrentUserError
}

export class LogoutAction implements Action {
  public readonly type = AuthActionType.Logout
}

export type AuthActions =
  | GetCurrentUser
  | GetCurrentUserSuccess
  | LogoutAction
  | GetCurrentUserError
