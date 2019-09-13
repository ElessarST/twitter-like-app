import { adapter, IFavoritesState, initialFavoritesState } from './state'
import { createReducer, on } from '@ngrx/store'
import * as FavoritesActions from './actions'
import { Tweet } from '../../models'

const favoritesReducer = createReducer(
  initialFavoritesState,
  on(FavoritesActions.getFavorites, state => ({ ...state, isLoading: true })),
  on(FavoritesActions.getFavoritesError, state => ({ ...state, isLoading: false })),
  on(FavoritesActions.getFavoritesSuccess, (state, { tweets }) => ({
    ...adapter.addAll(tweets, state),
    isHasMore: tweets.length > 0,
    isLoading: false,
  })),
  on(FavoritesActions.updateTweet, (state, { tweet }) => adapter.upsertOne(tweet, state)),
  on(FavoritesActions.addReply, (state, { reply, tweet }) => {
    const tweetWithReply: Tweet = {
      ...tweet,
      replies: [...tweet.replies, tweet],
    }
    return adapter.upsertMany([reply, tweetWithReply], state)
  }),
  on(FavoritesActions.addRetweet, (state, { retweet, tweet }) => {
    const tweetWithRetweet: Tweet = {
      ...tweet,
      retweetsCount: tweet.retweetsCount + 1,
    }
    return adapter.upsertMany([retweet, tweetWithRetweet], state)
  }),
  on(FavoritesActions.loadMore, state => ({ ...state, isLoadingMore: true })),
  on(FavoritesActions.loadMoreError, state => ({ ...state, hasMore: false, isLoadingMore: false })),
  on(FavoritesActions.loadMoreSuccess, (state, { tweets }) => ({
    ...adapter.addMany(tweets, state),
    isHasMore: tweets.length > 0,
    isLoadingMore: false,
  }))
)

export function reducer(state: IFavoritesState, action) {
  return favoritesReducer(state, action)
}
