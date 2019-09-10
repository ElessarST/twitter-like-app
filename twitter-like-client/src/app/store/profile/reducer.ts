import { createReducer, on } from '@ngrx/store'
import { adapter, initialProfileState, IProfileState } from './state'
import * as ProfileActions from './actions'
import { Tweet } from '../../models'

export const profileReducer = createReducer<IProfileState>(
  initialProfileState,
  on(ProfileActions.getUser, state => ({ ...state, user: null, isUserLoading: true })),
  on(ProfileActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isUserLoading: false,
  })),
  on(ProfileActions.getUserError, state => ({ ...state, isUserLoading: false })),
  on(ProfileActions.getTweets, state => ({ ...adapter.removeAll(state), isTweetsLoading: true })),
  on(ProfileActions.getTweetsSuccess, (state, { tweets }) => ({
    ...adapter.addAll(tweets, state),
    isTweetsLoading: false,
  })),
  on(ProfileActions.getTweetsError, state => ({ ...state, isTweetsLoading: false })),
  on(ProfileActions.updateTweet, (state, { tweet }) => adapter.upsertOne(tweet, state)),
  on(ProfileActions.updateUser, (state, { user }) => ({ ...state, user })),
  on(ProfileActions.addReply, (state, { reply, tweet }) => {
    const tweetWithReply: Tweet = {
      ...tweet,
      replies: [...tweet.replies, tweet],
    }
    return adapter.upsertMany([reply, tweetWithReply], state)
  }),
  on(ProfileActions.addRetweet, (state, { retweet, tweet }) => {
    const tweetWithRetweet: Tweet = {
      ...tweet,
      retweetsCount: tweet.retweetsCount + 1,
    }
    return adapter.upsertMany([retweet, tweetWithRetweet], state)
  }),
)
