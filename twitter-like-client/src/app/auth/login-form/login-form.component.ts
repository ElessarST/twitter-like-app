import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { IAppState } from '../../store/app/state'
import { getCurrentUser } from '../../store/auth/actions'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup
  returnUrl: string
  error = ''
  isLogging: boolean

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }

    const { email, password } = this.loginForm.value
    this.isLogging = true
    this.error = ''
    this.authService.login(email, password).subscribe(
      () => {
        this.store.dispatch(getCurrentUser())
        this.router.navigate([this.returnUrl])
      },
      () => {
        this.isLogging = false
        this.error = 'Invalid Email or Password'
      },
      () => (this.isLogging = false)
    )
  }
}
