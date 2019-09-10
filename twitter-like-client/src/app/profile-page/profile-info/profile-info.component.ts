import { Component, OnInit } from '@angular/core'
import { User } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsUserLoading, selectUser } from '../../store/profile/selectors'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  private user: User
  private isLoading: boolean = true

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => this.user = user)
    this.store.select(selectIsUserLoading).subscribe(isLoading => this.isLoading = isLoading)
  }
}
