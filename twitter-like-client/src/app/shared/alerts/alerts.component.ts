import { Component, OnInit } from '@angular/core'
import { AlertsService } from '../../core/alerts.service'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-alerts',
  template: '',
})
export class AlertsComponent implements OnInit {
  constructor(private alertsService: AlertsService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.alertsService
      .getAlerts()
      .subscribe(
        message => message.length > 0 && this._snackBar.open(message, undefined, { duration: 3000 })
      )
  }
}
