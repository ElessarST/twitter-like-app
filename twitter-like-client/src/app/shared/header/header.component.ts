import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  get isLoggedIn() {
    console.log(this.authService.getIsLoggedIn)
    return this.authService.getIsLoggedIn
  }

}
