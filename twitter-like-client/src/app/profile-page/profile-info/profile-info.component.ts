import { Component, OnInit } from '@angular/core'
import { User } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsUserLoading, selectUser } from '../../store/profile/selectors'
import { selectCurrentUser } from '../../store/auth/selectors'
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component'
import { MatDialog } from '@angular/material'
import { getCurrentUserSuccess } from '../../store/auth/actions'
import { updateUser } from '../../store/profile/actions'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  private user: User
  private currentUser: User
  private isLoading: boolean = true

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => (this.user = user))
    this.store.select(selectCurrentUser).subscribe(user => (this.currentUser = user))
    this.store.select(selectIsUserLoading).subscribe(isLoading => (this.isLoading = isLoading))
  }

  get isCurrentUser() {
    if (!this.user || !this.currentUser) {
      return false
    }
    return this.user._id === this.currentUser._id
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent)
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.store.dispatch(getCurrentUserSuccess({ user }))
        this.store.dispatch(updateUser({ user }))
      }
    })
  }
}
