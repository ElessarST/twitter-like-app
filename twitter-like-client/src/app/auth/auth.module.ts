import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    LoginFormComponent,
  ],
})
export class AuthModule { }
