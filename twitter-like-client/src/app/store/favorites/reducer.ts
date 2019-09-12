import { adapter, initialFavoritesState } from './state'
import { createReducer, on } from '@ngrx/store'
import * as FavoritesActions from './actions'
import { Tweet } from '../../models'

export const favoritesReducer = createReducer(
  initialFavoritesState,
  on(FavoritesActions.getFavorites, state => ({ ...state, isLoading: true })),
  on(FavoritesActions.getFavoritesError, state => ({ ...state, isLoading: false })),
  on(FavoritesActions.getFavoritesSuccess, (state, { tweets }) => ({
    ...adapter.addAll(tweets, state),
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
)
