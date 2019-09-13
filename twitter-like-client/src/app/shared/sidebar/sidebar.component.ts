import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectCurrentUser } from '../../store/auth/selectors'
import { User } from '../../models'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user: User

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(user => (this.user = user))
  }
}
