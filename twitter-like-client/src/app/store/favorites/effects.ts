import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import * as FavoritesActions from './actions'
import { TweetsService } from '../../core/tweets.service'

@Injectable()
export class FavoritesEffects {
  @Effect()
  getFavorites = this._actions$.pipe(
    ofType(FavoritesActions.getFavorites),
    switchMap(() =>
      this.tweetService.getFavorites().pipe(
        map(tweets => FavoritesActions.getFavoritesSuccess({ tweets })),
        catchError(() => of(FavoritesActions.getFavoritesError({}))),
      ),
    ),
  )

  constructor(private tweetService: TweetsService, private _actions$: Actions) {
  }
}
