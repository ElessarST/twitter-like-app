import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'

import * as TweetActions from './actions'
import { TweetsService } from '../../core/tweets.service'

@Injectable()
export class TweetEffects {
  @Effect()
  getTweet$ = this._actions$.pipe(
    ofType(TweetActions.getTweet),
    exhaustMap(({ tweetId }) => this.tweetsService.getTweetById(tweetId)),
    map(tweet => TweetActions.getTweetSuccess({ tweet })),
    catchError(() => of(TweetActions.getTweetError()))
  )

  constructor(private tweetsService: TweetsService, private _actions$: Actions) {}
}
