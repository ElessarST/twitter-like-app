import { FormGroup } from '@angular/forms'
import { FieldErrors, ResponseStatus } from '../models'
import { Observable, of, throwError } from 'rxjs'

export function setServerErrors(form: FormGroup, fieldErrors: FieldErrors) {
  Object.entries(fieldErrors).forEach(([key, value]) => {
    const control = form.get(key)
    control.setErrors({
      serverError: value,
    })
  })
}

export function checkError<T extends { status: ResponseStatus }>(data: T): Observable<T> {
  if (data.status === ResponseStatus.Error) {
    return throwError(data)
  }
  return of(data)
}
