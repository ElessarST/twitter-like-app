import { Tweet } from '../../models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export interface IFavoritesState extends EntityState<Tweet> {
  isLoading: boolean
  isHasMore: boolean
  isLoadingMore: boolean
}

export const adapter: EntityAdapter<Tweet> = createEntityAdapter<Tweet>({
  selectId: tweet => tweet._id,
})

export const initialFavoritesState: IFavoritesState = adapter.getInitialState({
  isLoading: false,
  isHasMore: false,
  isLoadingMore: false,
})
