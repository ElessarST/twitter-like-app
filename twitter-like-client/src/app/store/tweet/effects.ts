import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import * as TweetActions from './actions'
import { TweetsService } from '../../core/tweets.service'

@Injectable()
export class TweetEffects {
  @Effect()
  getTweet$ = this._actions$.pipe(
    ofType(TweetActions.getTweet),
    switchMap(action =>
      this.tweetsService.getTweetById(action.tweetId).pipe(
        map(tweet => TweetActions.getTweetSuccess({ tweet })),
        catchError(() => of(TweetActions.getTweetError({}))),
      )
    )
  )

  constructor(private tweetsService: TweetsService, private _actions$: Actions) {
  }
}
