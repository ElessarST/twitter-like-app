import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { IAppState } from '../app/state'
import * as FeedActions from './actions'
import { Router } from '@angular/router'
import { TweetsService } from '../../core/tweets.service'

@Injectable()
export class FeedEffects {
  @Effect()
  getFeed$ = this._actions$.pipe(
    ofType(FeedActions.getFeed),
    switchMap(() =>
      this.tweetService.getTweets().pipe(
        map(tweets => FeedActions.getFeedSuccess({ tweets })),
        catchError(() => of(FeedActions.getFeedError({}))),
      ),
    ),
  )

  constructor(
    private tweetService: TweetsService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>,
  ) {
  }
}
