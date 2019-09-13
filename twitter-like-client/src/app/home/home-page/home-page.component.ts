import { Component, OnInit } from '@angular/core'
import { IAppState } from '../../store/app/state'
import { Store } from '@ngrx/store'
import { Tweet } from '../../models'
import { addTweet } from '../../store/feed/actions'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {}

  onTweetCreate(tweet: Tweet) {
    this.store.dispatch(addTweet({ tweet }))
  }
}
