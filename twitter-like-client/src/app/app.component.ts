import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    authService.fetchCurrentUser().subscribe()
  }

  title = 'twitter-like-client';

  get isLoggedIn() {
    return this.authService.getIsLoggedIn
  }
}
