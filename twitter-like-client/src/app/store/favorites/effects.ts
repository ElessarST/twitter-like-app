import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, first, map, switchMap } from 'rxjs/operators'

import * as FavoritesActions from './actions'
import { TweetsService } from '../../core/tweets.service'
import { Store } from '@ngrx/store'
import { IAppState } from '../app/state'
import { selectLastTweet } from './selectors'

@Injectable()
export class FavoritesEffects {
  @Effect()
  getFavorites = this._actions$.pipe(
    ofType(FavoritesActions.getFavorites),
    switchMap(() =>
      this.tweetService.getFavorites().pipe(
        map(tweets => FavoritesActions.getFavoritesSuccess({ tweets })),
        catchError(() => of(FavoritesActions.getFavoritesError()))
      )
    )
  )

  @Effect()
  loadMore$ = this._actions$.pipe(
    ofType(FavoritesActions.loadMore),
    switchMap(() => this._store.select(selectLastTweet).pipe(first())),
    switchMap(lastTweet => {
      return this.tweetService.getFavorites(get(lastTweet, 'createdAt', new Date().getTime())).pipe(
        map(tweets => FavoritesActions.loadMoreSuccess({ tweets })),
        catchError(() => of(FavoritesActions.loadMoreError()))
      )
    })
  )

  constructor(
    private tweetService: TweetsService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
