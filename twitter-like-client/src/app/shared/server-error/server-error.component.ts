import { get } from 'lodash'
import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  @Input() form: FormGroup
  @Input() field: string

  constructor() {}

  ngOnInit() {}

  get errors() {
    const control = this.form.get(this.field)
    return get(control, 'errors', null)
  }
}
