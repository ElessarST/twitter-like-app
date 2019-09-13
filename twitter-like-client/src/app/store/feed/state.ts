import { Tweet } from '../../models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export interface IFeedState extends EntityState<Tweet> {
  isLoading: boolean
  isLoadingMore: boolean
  isHasMore: boolean
}

export const adapter: EntityAdapter<Tweet> = createEntityAdapter<Tweet>({
  selectId: tweet => tweet._id,
})

export const initialFeedState: IFeedState = adapter.getInitialState({
  isLoading: false,
  isLoadingMore: false,
  isHasMore: false,
})
