import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { getProfile, getTweets } from '../../store/profile/actions'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectTweetsCount, selectUserName } from '../../store/profile/selectors'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  private name: string
  private tweetsCount: number

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.select(selectUserName).subscribe(name => (this.name = name))
    this.store.select(selectTweetsCount).subscribe(tweetsCount => (this.tweetsCount = tweetsCount))
    this.route.paramMap.subscribe(params => {
      const username = params.get('username')
      this.store.dispatch(getProfile({ username }))
      this.store.dispatch(getTweets({ username }))
    })
  }

  get nameWithTweets() {
    const name = this.name || 'Profile'
    const tweets = this.tweetsCount ? `(${this.tweetsCount} tweets)` : ''
    return `${name} ${tweets}`
  }
}
