import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, from, Observable } from 'rxjs'

import { User } from '../models/User'

const TOKEN_KEY = 'token'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null)
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public static get token(): string {
    return localStorage.getItem(TOKEN_KEY)
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  public get getIsLoggedIn(): boolean {
    return !!this.currentUserValue
  }

  fetchCurrentUser(): Observable<User> {
    this.currentUserSubject.next({ email: 'st@gmail.com', avatarUrl: '' })
    return from(Promise.resolve({ email: 'st@gmail.com', avatarUrl: '' }))
  }

  login(email: string, password: string) {
    localStorage.setItem(TOKEN_KEY, 'token')
    return this.fetchCurrentUser()
    /*return this.http.post<any>(`http://localhost:3000/login`, { email, password })
      .pipe(
        map(resp => {
          if (resp && resp.token) {
            localStorage.setItem(TOKEN_KEY, resp.token);
            return resp.token;
          }
          return null;
        }),
        flatMap(token => {
          if (token) {
            return this.fetchCurrentUser();
          }
          return from(null);
        }),
      );*/
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    this.currentUserSubject.next(null)
  }
}
