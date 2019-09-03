import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup
  loading = false
  submitted = false
  error = ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      photoUrl: '',
    })

    this.authService.logout()
  }

  onSubmit() {
    this.submitted = true

    if (this.signUpForm.invalid) {
      return
    }

    this.loading = true
    this.authService
      .signUp(this.signUpForm.value)
      .pipe(first())
      .subscribe(
        () => this.router.navigate(['/']),
        error => {
          this.error = error
          this.loading = false
        },
      )
  }

  onPhotoChange(photoUrl) {
    this.signUpForm.patchValue({ photoUrl })
  }

  get values() {
    return this.signUpForm.value
  }
}
