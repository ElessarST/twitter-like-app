import { reducer } from './reducer'
import { initialTweetState } from './state'
import * as TweetActions from './actions'
import { testTweet } from '../../mocks'

describe('Tweet Reducer', () => {
  it('should handle TweetActions.getTweet', () => {
    const state = reducer(initialTweetState, TweetActions.getTweet({ tweetId: '' }))
    expect(state).toEqual({
      tweet: null,
      isLoading: true,
    })
  })
  it('should handle TweetActions.getTweetSuccess', () => {
    const state = reducer(
      { tweet: null, isLoading: true },
      TweetActions.getTweetSuccess({ tweet: testTweet })
    )
    expect(state).toEqual({
      isLoading: false,
      tweet: testTweet,
    })
  })
  it('should handle TweetActions.getTweetError', () => {
    const state = reducer({ tweet: null, isLoading: true }, TweetActions.getTweetError())
    expect(state).toEqual({
      isLoading: false,
      tweet: null,
    })
  })
  it('should handle TweetActions.updateTweet', () => {
    const newTweet = { ...testTweet, _id: '2' }
    const state = reducer(
      { tweet: testTweet, isLoading: false },
      TweetActions.updateTweet({ tweet: newTweet })
    )
    expect(state).toEqual({
      isLoading: false,
      tweet: newTweet,
    })
  })
})
