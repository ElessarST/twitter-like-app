import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private alerts: Subject<string> = new BehaviorSubject('')

  constructor() {
  }

  push(message: string) {
    this.alerts.next(message)
  }

  getAlerts() {
    return this.alerts
  }
}
