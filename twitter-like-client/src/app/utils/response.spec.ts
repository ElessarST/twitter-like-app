import { checkError, setServerErrors } from './response'
import { ResponseStatus } from '../models'

describe('response utils', () => {
  describe('checkError', () => {
    it('should throw error for status=error', done => {
      const data = { status: ResponseStatus.Error }
      checkError(data).subscribe(
        () => {
          throw Error()
        },
        error => {
          expect(error).toBe(data)
          done()
        }
      )
    })

    it('should return data for status=ok', done => {
      const data = { status: ResponseStatus.Ok }
      checkError(data).subscribe(
        result => {
          expect(result).toBe(data)
          done()
        },
        () => {
          throw Error()
        }
      )
    })
  })

  describe('setServerErrors', () => {
    it('should set errors for controls', () => {
      const nameControl = { setErrors() {} }
      const descriptionControl = { setErrors() {} }
      const formSpy: any = {
        get(name) {
          return name === 'name' ? nameControl : descriptionControl
        },
      }
      spyOn(formSpy, 'get').and.callThrough()
      spyOn(nameControl, 'setErrors').and.callThrough()
      spyOn(descriptionControl, 'setErrors').and.callThrough()
      const fieldError = {
        name: 'name error',
        description: 'description error',
      }
      setServerErrors(formSpy, fieldError)
      expect(formSpy.get).toHaveBeenCalledTimes(2)
      expect(nameControl.setErrors).toHaveBeenCalledWith({ serverError: fieldError.name })
      expect(descriptionControl.setErrors).toHaveBeenCalledWith({
        serverError: fieldError.description,
      })
    })
  })
})
