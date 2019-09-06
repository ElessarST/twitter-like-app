export enum ResponseStatus {
  Ok = 'ok',
  Error = 'error',
}

export type FieldErrors = Record<string, string>

export type Response<T> = {
  status: ResponseStatus
  error: string
  fieldErrors: FieldErrors
  data: T
}
