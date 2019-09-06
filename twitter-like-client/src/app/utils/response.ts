import { FormGroup } from '@angular/forms'
import { FieldErrors } from '../models'

export function setServerErrors(form: FormGroup, fieldErrors: FieldErrors) {
  Object.entries(fieldErrors).forEach(([key, value]) => {
    const control = form.get(key)
    control.setErrors({
      serverError: value,
    })
  })
}
