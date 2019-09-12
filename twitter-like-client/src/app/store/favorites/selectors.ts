import { createSelector } from '@ngrx/store'
import { orderBy } from 'lodash'

import { IAppState } from '../app/state'
import { adapter, IFavoritesState } from './state'

const selectFavoritesState = (state: IAppState) => state.favorites

export const selectIsLoading = createSelector(
  selectFavoritesState,
  (state: IFavoritesState) => state.isLoading,
)

const { selectAll } = adapter.getSelectors()

export const selectFavoritesTweets = createSelector(
  selectFavoritesState,
  selectAll,
)

export const selectSortedFavorites = createSelector(
  selectFavoritesTweets,
  (tweets) => orderBy(tweets, t => -t.createdAt),
)
