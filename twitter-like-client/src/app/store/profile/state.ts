import { Tweet, User } from '../../models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export interface IProfileState extends EntityState<Tweet> {
  user: User
  isUserLoading: boolean
  isTweetsLoading: boolean
  isLoadingMore: boolean
  isHasMore: boolean
}

export const adapter: EntityAdapter<Tweet> = createEntityAdapter<Tweet>({
  selectId: tweet => tweet._id,
})

export const initialProfileState: IProfileState = adapter.getInitialState({
  user: null,
  isUserLoading: false,
  isTweetsLoading: false,
  isLoadingMore: false,
  isHasMore: false,
})
