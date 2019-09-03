import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { LoginFormComponent } from './auth/login-form/login-form.component'
import { HomePageComponent } from './home/home-page/home-page.component'
import { LogoutComponent } from './auth/logout/logout.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true } )],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
