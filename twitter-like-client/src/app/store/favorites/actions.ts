import { createAction, props } from '@ngrx/store'
import { Tweet } from '../../models'

export const getFavorites = createAction('[Favorites] Get Favorites', props<{}>())
export const getFavoritesError = createAction('[Favorites] Get Favorites Error', props<{}>())
export const getFavoritesSuccess = createAction(
  '[Favorites] Get Favorites Success',
  props<{ tweets: Tweet[] }>(),
)
export const addReply = createAction(
  '[Favorites] Add Reply',
  props<{ tweet: Tweet; reply: Tweet }>(),
)
export const addRetweet = createAction(
  '[Favorites] Add Retweet',
  props<{ tweet: Tweet; retweet: Tweet }>(),
)
export const updateTweet = createAction('[Favorites] Update Tweet', props<{ tweet: Tweet }>())
export const loadMore = createAction('[Favorites] Load More', props<{}>())
export const loadMoreError = createAction('[Favorites] Load More Error', props<{}>())
export const loadMoreSuccess = createAction(
  '[Favorites] Load More Success',
  props<{ tweets: Tweet[] }>(),
)
