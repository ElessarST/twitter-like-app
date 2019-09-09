import { Component, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { IAppState } from '../../store/app/state'
import { Store } from '@ngrx/store'
import { selectIsLoading, selectTweet } from '../../store/tweet/selectors'
import { ActivatedRoute } from '@angular/router'
import { getTweet } from '../../store/tweet/actions'

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.scss'],
})
export class TweetPageComponent implements OnInit {
  private tweet: Tweet
  private isLoading: boolean = true

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.select(selectTweet).subscribe(tweet => this.tweet = tweet)
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading))
    this.route.paramMap.subscribe(params =>
      this.store.dispatch(getTweet({ tweetId: params.get('tweetId') })),
    )
  }
}
