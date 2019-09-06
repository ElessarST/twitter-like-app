import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { LogoutAction } from '../../store/auth/actions'

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LogoutAction())
  }
}
