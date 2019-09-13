import { TweetDatePipe } from './tweet-date.pipe'
import * as moment from 'moment'

describe('TweetDatePipe', () => {
  let pipe
  beforeEach(() => {
    pipe = new TweetDatePipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return formatted date if more than 2 days ago', () => {
    const date = moment().subtract(3, 'd')
    expect(pipe.transform(date)).toBe(date.format('lll'))
  })

  it('should return ago string date if less than 2 days ago', () => {
    let date = moment().subtract(2, 'd')
    expect(pipe.transform(date)).toBe('2 days ago')
    date = moment().subtract(1, 's')
    expect(pipe.transform(date)).toBe('a few seconds ago')
  })

})
