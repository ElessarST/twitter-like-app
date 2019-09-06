import { RouterReducerState } from '@ngrx/router-store'

import { IAuthState, initialAuthState } from '../auth/state'


export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
}

export function getInitialState(): IAppState {
  return initialAppState
}
