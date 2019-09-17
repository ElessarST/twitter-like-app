import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectCurrentUser } from '../../store/auth/selectors'
import { User } from '../../models'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public user$: Subscription
  public user: User

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(selectCurrentUser).subscribe(user => (this.user = user))
  }

  ngOnDestroy() {
    this.user$.unsubscribe()
  }
}
