import { ActionReducerMap } from '@ngrx/store'

import { routerReducer } from '@ngrx/router-store'
import { IAppState } from './state'
import { reducer as authReducer } from '../auth/reducer'
import { reducer as feedReducer } from '../feed/reducer'
import { reducer as tweetReducer } from '../tweet/reducer'
import { reducer as profileReducer } from '../profile/reducer'
import { reducer as favoritesReducer } from '../favorites/reducer'

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authReducer,
  feed: feedReducer,
  tweet: tweetReducer,
  profile: profileReducer,
  favorites: favoritesReducer,
}
