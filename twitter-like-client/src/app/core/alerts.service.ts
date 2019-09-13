import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private alerts: Subject<string> = new BehaviorSubject('')

  constructor() {}

  push(message: string) {
    this.alerts.next(message)
  }

  getAlerts() {
    return this.alerts.pipe(filter(message => !!message))
  }
}
