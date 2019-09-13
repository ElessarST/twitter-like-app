import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectCurrentUser } from '../../store/auth/selectors'
import { UserService } from '../../core/user.service'
import { Response, User } from '../../models'
import { setServerErrors } from '../../utils/response'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})
export class EditProfileDialogComponent implements OnInit {
  editProfileForm: FormGroup
  loading = false
  error = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<IAppState>,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>
  ) {}

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(currentUser => {
      this.editProfileForm = this.formBuilder.group({
        username: [currentUser.username, Validators.required],
        name: [currentUser.name, Validators.required],
        bio: currentUser.bio,
        photoUrl: currentUser.photoUrl,
      })
    })
  }

  onSubmit() {
    if (this.editProfileForm.invalid) {
      return
    }
    this.loading = true
    this.userService.editProfile(this.values).subscribe(
      response => this.dialogRef.close(response.data),
      (error: Response<User>) => {
        setServerErrors(this.editProfileForm, error.fieldErrors)
        this.loading = false
      },
      () => (this.loading = false)
    )
  }

  onPhotoChange(photoUrl) {
    this.editProfileForm.patchValue({ photoUrl })
  }

  get values() {
    return this.editProfileForm.value
  }
}
