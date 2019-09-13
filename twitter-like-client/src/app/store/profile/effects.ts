import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, first, map, switchMap } from 'rxjs/operators'

import * as ProfileActions from './actions'
import { TweetsService } from '../../core/tweets.service'
import { UserService } from '../../core/user.service'
import { AlertsService } from '../../core/alerts.service'
import { selectLastTweet } from './selectors'
import { Store } from '@ngrx/store'
import { IAppState } from '../app/state'

@Injectable()
export class ProfileEffects {
  @Effect()
  getTweets$ = this._actions$.pipe(
    ofType(ProfileActions.getTweets),
    switchMap(action =>
      this.tweetsService.getTweetsByUser(action.username).pipe(
        map(tweets => ProfileActions.getTweetsSuccess({ tweets })),
        catchError(() => of(ProfileActions.getTweetsError()))
      )
    )
  )
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType(ProfileActions.getProfile),
    switchMap(action =>
      this.userService.getUser(action.username).pipe(
        map(user => ProfileActions.getProfileSuccess({ user })),
        catchError(() => of(ProfileActions.getProfileError()))
      )
    )
  )

  @Effect()
  loadMore$ = this._actions$.pipe(
    ofType(ProfileActions.loadMore),
    switchMap(({ username }) =>
      this._store.select(selectLastTweet).pipe(
        first(),
        map(lastTweet => ({
          username,
          lastTweet,
        }))
      )
    ),
    switchMap(({ username, lastTweet }) => {
      return this.tweetsService
        .getTweetsByUser(username, get(lastTweet, 'createdAt', new Date().getTime()))
        .pipe(
          map(tweets => ProfileActions.loadMoreSuccess({ tweets })),
          catchError(() => of(ProfileActions.loadMoreError()))
        )
    })
  )

  constructor(
    private tweetsService: TweetsService,
    private userService: UserService,
    private alertSerivce: AlertsService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
