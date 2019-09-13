import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'
import { AlertsService } from '../core/alerts.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private alertsService: AlertsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res: any) => {
        if (res.body && res.body.data) {
          const data = res.body.data || {}
          const graphqlKey = Object.keys(data)
          const responseData = data[graphqlKey[0]]
          if (!responseData) {
            if (get(res, 'body.errors[0].extensions.code') === 'NOT_FOUND') {
              this.alertsService.push(res.body.errors[0].message)
            }
          } else if (responseData.error) {
            this.alertsService.push(responseData.error)
          }
        }
      }),
      catchError(err => {
        if (
          err.status === 500 &&
          get(err, 'error.errors[0].message', '').includes('AUTH_REQUIRED_CODE')
        ) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout()
          location.reload()
        }
        console.log(err)

        return throwError(err.error)
      })
    )
  }
}
