import { createSelector } from '@ngrx/store'
import { orderBy } from 'lodash'
import { IAppState } from '../app/state'
import { IProfileState } from './state'
import { adapter } from '../feed/state'
import { Tweet, User } from '../../models'

const selectProfileState = (state: IAppState) => state.profile

export const selectIsUserLoading = createSelector(
  selectProfileState,
  (state: IProfileState) => state.isUserLoading,
)

export const selectIsTweetsLoading = createSelector(
  selectProfileState,
  (state: IProfileState) => state.isTweetsLoading,
)

const { selectAll } = adapter.getSelectors()

export const selectTweets = createSelector(
  selectProfileState,
  selectAll,
)

export const selectTweetsSorted = createSelector(
  selectTweets,
  tweets => orderBy(tweets, t => -t.createdAt),
)

export const selectUser = createSelector(
  selectProfileState,
  (state: IProfileState) => state.user,
)

export const selectUserName = createSelector(
  selectUser,
  (user: User) => (user ? user.name : ''),
)

export const selectTweetsCount = createSelector(
  selectTweets,
  (tweets: Tweet[]) => tweets.length,
)
