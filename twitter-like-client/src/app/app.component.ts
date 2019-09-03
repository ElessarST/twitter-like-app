import { Component } from '@angular/core'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isLoading: boolean = true
  constructor(private authService: AuthService) {
    authService.fetchCurrentUser().subscribe(() => this.isLoading = false)
  }

  title = 'twitter-like-client';

  get isLoggedIn() {
    return this.authService.getIsLoggedIn
  }
}
