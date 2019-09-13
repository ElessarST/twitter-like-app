import { adapter, IFeedState, initialFeedState } from './state'
import { createReducer, on } from '@ngrx/store'
import * as FeedActions from './actions'
import { Tweet } from '../../models'

const feedReducer = createReducer(
  initialFeedState,
  on(FeedActions.getFeed, state => ({ ...state, isLoading: true })),
  on(FeedActions.getFeedError, state => ({ ...state, isLoading: false })),
  on(FeedActions.getFeedSuccess, (state, { tweets }) => ({
    ...adapter.addAll(tweets, state),
    isLoading: false,
    isHasMore: tweets.length > 0,
  })),
  on(FeedActions.addTweet, (state, { tweet }) => adapter.addOne(tweet, state)),
  on(FeedActions.updateTweet, (state, { tweet }) => adapter.upsertOne(tweet, state)),
  on(FeedActions.addReply, (state, { reply, tweet }) => {
    const tweetWithReply: Tweet = {
      ...tweet,
      replies: [...tweet.replies, tweet],
    }
    return adapter.upsertMany([reply, tweetWithReply], state)
  }),
  on(FeedActions.addRetweet, (state, { retweet, tweet }) => {
    const tweetWithRetweet: Tweet = {
      ...tweet,
      retweetsCount: tweet.retweetsCount + 1,
    }
    return adapter.upsertMany([retweet, tweetWithRetweet], state)
  }),
  on(FeedActions.loadMore, state => ({ ...state, isLoadingMore: true })),
  on(FeedActions.loadMoreError, state => ({ ...state, hasMore: false, isLoadingMore: false })),
  on(FeedActions.loadMoreSuccess, (state, { tweets }) => ({
    ...adapter.addMany(tweets, state),
    isHasMore: tweets.length > 0,
    isLoadingMore: false,
  }))
)

export function reducer(state: IFeedState, action) {
  return feedReducer(state, action)
}
