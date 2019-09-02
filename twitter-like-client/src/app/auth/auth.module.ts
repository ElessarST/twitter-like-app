import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginFormComponent, LogoutComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    LoginFormComponent,
  ],
})
export class AuthModule { }
