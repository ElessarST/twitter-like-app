import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from './store/app/state'
import { GetCurrentUser } from './store/auth/actions'
import { selectIsFetchingCurrentUser, selectIsLoggedIn } from './store/auth/selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private isLoading: boolean = true
  private isLoggedIn: boolean = false

  constructor(private _store: Store<IAppState>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetCurrentUser())
    this._store
      .select(selectIsFetchingCurrentUser)
      .subscribe(isLoading => (this.isLoading = isLoading))
    this._store.select(selectIsLoggedIn).subscribe(isLoading => (this.isLoggedIn = isLoading))
  }

  title = 'twitter-like-client'
}
