import { AlertsService } from './alerts.service'

describe('AlertsService', () => {
  let service: AlertsService
  beforeEach(() => {
    service = new AlertsService()
  })

  it('should push data', done => {
    const message = 'message'
    service.getAlerts().subscribe(alert => {
      expect(alert).toBe(message)
      done()
    })
    service.push(message)
  })
})
