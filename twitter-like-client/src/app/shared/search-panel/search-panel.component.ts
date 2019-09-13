import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { debounceTime, filter, switchMap } from 'rxjs/operators'
import { UserService } from '../../core/user.service'
import { User } from '../../models'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
})
export class SearchPanelComponent implements OnInit {
  public searchUserControl = new FormControl()
  public users$: Observable<User[]>

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.searchUserControl.valueChanges.pipe(
      debounceTime(300),
      filter(value => value && value.length > 2),
      switchMap(value => this.userService.searchUsers(value))
    )
  }
}
