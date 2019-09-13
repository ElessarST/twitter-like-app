import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, first, map, switchMap } from 'rxjs/operators'

import { IAppState } from '../app/state'
import * as FeedActions from './actions'
import { Router } from '@angular/router'
import { TweetsService } from '../../core/tweets.service'
import { selectLastTweet } from './selectors'

@Injectable()
export class FeedEffects {
  @Effect()
  getFeed$ = this._actions$.pipe(
    ofType(FeedActions.getFeed),
    switchMap(() =>
      this.tweetService.getFeed().pipe(
        map(tweets => FeedActions.getFeedSuccess({ tweets })),
        catchError(() => of(FeedActions.getFeedError()))
      )
    )
  )

  @Effect()
  loadMore$ = this._actions$.pipe(
    ofType(FeedActions.loadMore),
    switchMap(() => this._store.select(selectLastTweet).pipe(first())),
    switchMap(lastTweet => {
      return this.tweetService.getFeed(get(lastTweet, 'createdAt', new Date().getTime())).pipe(
        map(tweets => FeedActions.loadMoreSuccess({ tweets })),
        catchError(() => of(FeedActions.loadMoreError()))
      )
    })
  )

  constructor(
    private tweetService: TweetsService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>
  ) {}
}
