import { cold, hot } from 'jasmine-marbles'
import * as TweetActions from './actions'
import { TweetEffects } from './effects'
import { Observable } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { TweetsService } from '../../core/tweets.service'
import { testTweet } from '../../mocks'


describe('Tweet Effects', () => {
  let actions: Observable<any>

  let effects: TweetEffects
  let tweetsService: jasmine.SpyObj<TweetsService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TweetEffects,
        provideMockActions(() => actions),
        {
          provide: TweetsService,
          useValue: {
            getTweetById: jasmine.createSpy(),
          },
        },
      ],
    })

    effects = TestBed.get(TweetEffects)
    tweetsService = TestBed.get(TweetsService)
  })

  describe('getTweet$', () => {
    it('should return a stream with current tweet loaded action', () => {
      const tweet = testTweet
      const action = TweetActions.getTweet({ tweetId: '1' })
      const outcome = TweetActions.getTweetSuccess({ tweet  })

      actions = hot('-a', { a: action })
      const response = cold('-a|', { a: tweet })
      tweetsService.getTweetById.and.returnValue(response)

      const expected = cold('--b', { b: outcome })
      expect(effects.getTweet$).toBeObservable(expected)
      expect(tweetsService.getTweetById).toHaveBeenCalledWith('1')
    })

    it('should return error if failed to get tweet', () => {
      const error = new Error('some error') as any
      const action = TweetActions.getTweet({ tweetId: '1' })
      const outcome = TweetActions.getTweetError()

      actions = hot('-a', { a: action })
      const response = cold('-#|', {}, error)
      tweetsService.getTweetById.and.returnValue(response)

      const expected = cold('--(b|)', { b: outcome })
      expect(effects.getTweet$).toBeObservable(expected)
    })
  })
})
