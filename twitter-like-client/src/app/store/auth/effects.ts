import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { EMPTY, of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { IAppState } from '../app/state'
import * as AuthActions from './actions'
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffects {
  @Effect()
  getCurrentUser$ = this._actions$.pipe(
    ofType(AuthActions.getCurrentUser),
    switchMap(() =>
      this.authService.fetchCurrentUser().pipe(
        map(user => AuthActions.getCurrentUserSuccess(user)),
        catchError(() => of(AuthActions.getCurrentUserError)),
      ),
    ),
  )

  @Effect({ dispatch: false })
  logout$ = this._actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.authService.logout()),
    tap(() => this.router.navigate(['/'])),
    switchMap(() => of(EMPTY)),
  )

  constructor(
    private authService: AuthService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>,
  ) {
  }
}
