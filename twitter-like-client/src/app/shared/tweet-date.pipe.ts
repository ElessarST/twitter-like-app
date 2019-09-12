import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

const MAX_DAYS = 2

@Pipe({
  name: 'tweetDate',
})
export class TweetDatePipe implements PipeTransform {
  transform(value: number): string {
    const now = moment()
    const date = moment(value)
    if (now.diff(date, 'd') > MAX_DAYS) {
      return date.format('lll')
    }
    return date.fromNow()
  }
}
