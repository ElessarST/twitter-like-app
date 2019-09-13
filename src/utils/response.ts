import { ValidationError } from 'yup'
import * as Express from 'express'
import { IErrorResponse, Response, ResponseStatus } from '../models/Response'

function transformToErrors(error: ValidationError) {
  if (!error || !error.inner) {
    return {}
  }
  return error.inner.reduce(
    (res, err) => ({
      ...res,
      [err.path]: err.message,
    }),
    {}
  )
}

export function createErrorResponse(
  errorMessage: string,
  fieldErrors: ValidationError = null
): IErrorResponse {
  return {
    status: ResponseStatus.Error,
    error: errorMessage,
    fieldErrors: transformToErrors(fieldErrors),
  }
}

export function sendError(
  res: Express.Response,
  errorMessage: string,
  fieldErrors: ValidationError
) {
  res.status(400)
  return res.json(createErrorResponse(errorMessage, fieldErrors))
}

export function createSuccessResponse<T>(data: T): Response<T> {
  return {
    status: ResponseStatus.Ok,
    data,
  }
}

export function sendSuccess<T>(res: Express.Response, data: any) {
  res.status(200)
  return res.json(createSuccessResponse<T>(data))
}
