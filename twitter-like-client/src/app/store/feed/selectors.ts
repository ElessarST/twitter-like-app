import { createSelector } from '@ngrx/store'
import { orderBy } from 'lodash'

import { IAppState } from '../app/state'
import { adapter, IFeedState } from './state'

const selectFeed = (state: IAppState) => state.feed

export const selectIsLoading = createSelector(
  selectFeed,
  (state: IFeedState) => state.isLoading,
)

const { selectAll } = adapter.getSelectors()

export const selectFeedTweets = createSelector(
  selectFeed,
  selectAll,
)

export const selectSortedFeed = createSelector(
  selectFeedTweets,
  (tweets) => orderBy(tweets, t => -t.createdAt),
)
