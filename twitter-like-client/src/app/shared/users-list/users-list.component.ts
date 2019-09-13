import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'
import { User } from '../../models'

type UsersData = {
  users: User[]
  title: string
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: User[]
  public title: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.users = data.users
    this.title = data.title
  }

  ngOnInit() {}
}
