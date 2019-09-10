import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import * as ProfileActions from './actions'
import { TweetsService } from '../../core/tweets.service'
import { UserService } from '../../core/user.service'
import { AlertsService } from '../../core/alerts.service'

@Injectable()
export class ProfileEffects {
  @Effect()
  getTweets$ = this._actions$.pipe(
    ofType(ProfileActions.getTweets),
    switchMap(action =>
      this.tweetsService.getTweetsByUser(action.username).pipe(
        map(tweets => ProfileActions.getTweetsSuccess({ tweets })),
        catchError(() => of(ProfileActions.getTweetsError({}))),
      ),
    ),
  )
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType(ProfileActions.getUser),
    switchMap(action =>
      this.userService.getUser(action.username).pipe(
        map(user => ProfileActions.getUserSuccess({ user })),
        catchError(() => of(ProfileActions.getUserError({}))),
      ),
    ),
  )

  constructor(
    private tweetsService: TweetsService,
    private userService: UserService,
    private alertSerivce: AlertsService,
    private _actions$: Actions,
  ) {
  }
}
