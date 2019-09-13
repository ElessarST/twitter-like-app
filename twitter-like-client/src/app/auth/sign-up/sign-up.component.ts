import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { getCurrentUser } from '../../store/auth/actions'
import { IAppState } from '../../store/app/state'
import { Store } from '@ngrx/store'
import { setServerErrors } from '../../utils/response'
import { Response, User } from '../../models'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      bio: '',
      photoUrl: '',
    })
  }

  onSubmit() {
    this.submitted = true

    if (this.signUpForm.invalid) {
      return
    }

    this.loading = true
    this.authService.signUp(this.signUpForm.value).subscribe(
      () => {
        this.store.dispatch(getCurrentUser())
        return this.router.navigate(['/'])
      },
      (error: Response<User>) => {
        setServerErrors(this.signUpForm, error.fieldErrors)
        this.loading = false
      }
    )
  }

  onPhotoChange(photoUrl) {
    this.signUpForm.patchValue({ photoUrl })
  }

  get values() {
    return this.signUpForm.value
  }
}
