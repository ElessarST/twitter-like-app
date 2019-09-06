export enum ResponseStatus {
  Ok = 'ok',
  Error = 'error',
}

export interface IResponse {
  status: ResponseStatus
}

export interface ISuccessResponse<T> extends IResponse {
  status: ResponseStatus.Ok
  data?: T
}

export interface IErrorResponse extends IResponse {
  status: ResponseStatus.Error
  error: string
  fieldErrors: { [key: string]: string }
}

export type Response<T> = ISuccessResponse<T> | IErrorResponse
