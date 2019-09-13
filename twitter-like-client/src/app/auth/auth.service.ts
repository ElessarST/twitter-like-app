import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'

import { Response, User } from '../models'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { UserService } from '../core/user.service'
import { environment } from '../../environments/environment'

const TOKEN_KEY = 'token'

type TokenResponse = {
  token: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public get token(): string {
    return localStorage.getItem(TOKEN_KEY)
  }

  fetchCurrentUser(): Observable<User> {
    if (!this.token) {
      return throwError('No token')
    }
    return this.userService.getCurrentUser()
  }

  login(email: string, password: string) {
    return this.http
      .post<Response<TokenResponse>>(`${environment.base_url}/login`, { email, password })
      .pipe(
        map(resp => {
          const { token } = resp.data
          localStorage.setItem(TOKEN_KEY, token)
          return resp.data.token
        })
      )
  }

  signUp(user) {
    return this.http.post<Response<TokenResponse>>(`${environment.base_url}/signUp`, user).pipe(
      map(resp => {
        localStorage.setItem(TOKEN_KEY, resp.data.token)
        return resp.data.token
      })
    )
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY)
  }
}
