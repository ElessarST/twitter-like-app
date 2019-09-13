import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { LoginFormComponent } from './login-form/login-form.component'
import { LogoutComponent } from './logout/logout.component'
import { SignUpComponent } from './sign-up/sign-up.component'

@NgModule({
  declarations: [LoginFormComponent, LogoutComponent, SignUpComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginFormComponent, SignUpComponent],
})
export class AuthModule {}
