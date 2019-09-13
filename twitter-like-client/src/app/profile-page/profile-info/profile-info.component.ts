import { Component, OnInit } from '@angular/core'
import { User } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsUserLoading, selectUser } from '../../store/profile/selectors'
import { selectCurrentUser } from '../../store/auth/selectors'
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component'
import { MatDialog } from '@angular/material'
import { getCurrentUserSuccess } from '../../store/auth/actions'
import { updateProfile } from '../../store/profile/actions'
import { UserService } from '../../core/user.service'
import { UsersListComponent } from '../../shared/users-list/users-list.component'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  public user: User
  public currentUser: User
  public isLoading: boolean = true

  constructor(
    private store: Store<IAppState>,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

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
        this.store.dispatch(updateProfile({ user }))
      }
    })
  }

  follow() {
    this.userService.follow(this.user).subscribe(({ data: user }) => {
      this.store.dispatch(getCurrentUserSuccess({ user }))
      this.store.dispatch(updateProfile({ user: this.withFollower(this.user) }))
    })
  }

  unfollow() {
    this.userService.unfollow(this.user).subscribe(({ data: user }) => {
      this.store.dispatch(getCurrentUserSuccess({ user }))
      this.store.dispatch(updateProfile({ user: this.withoutFollower(this.user) }))
    })
  }

  get isFollowing() {
    const { followers = [] } = this.user
    return !!followers.find(f => f._id === this.currentUser._id)
  }

  private withFollower({ followers = [], ...user }: User) {
    return {
      ...user,
      followers: [...followers, this.currentUser],
    }
  }

  private withoutFollower({ followers = [], ...user }: User) {
    return {
      ...user,
      followers: followers.filter(f => f._id !== this.currentUser._id),
    }
  }

  public showFollowers() {
    this.dialog.open(UsersListComponent, {
      data: { users: this.user.followers, title: 'Followers' },
    })
  }

  public showFollowing() {
    this.dialog.open(UsersListComponent, {
      data: { users: this.user.following, title: 'Following' },
    })
  }
}
