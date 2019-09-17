import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from './store/app/state'
import { getCurrentUser } from './store/auth/actions'
import { selectIsFetchingCurrentUser, selectIsLoggedIn } from './store/auth/selectors'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public isLoading$: Subscription
  public isLoggedIn$: Subscription
  public isLoading: boolean = true
  public isLoggedIn: boolean = false

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this._store.dispatch(getCurrentUser())
    this.isLoading$ = this._store
      .select(selectIsFetchingCurrentUser)
      .subscribe(isLoading => (this.isLoading = isLoading))
    this.isLoggedIn$ = this._store.select(selectIsLoggedIn)
      .subscribe(isLoading => (this.isLoggedIn = isLoading))
  }

  title = 'twitter-like-client'

  ngOnDestroy(): void {
    this.isLoading$.unsubscribe()
    this.isLoggedIn$.unsubscribe()
  }
}
