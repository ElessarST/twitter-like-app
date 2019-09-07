import { ActionReducerMap } from '@ngrx/store'

import { routerReducer } from '@ngrx/router-store'
import { IAppState } from './state'
import { authReducer } from '../auth/reducer'
import { feedReducer } from '../feed/reducer'

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authReducer,
  feed: feedReducer,
}
