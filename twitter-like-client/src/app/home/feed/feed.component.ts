import { Component, OnInit } from '@angular/core'
import { TweetsService } from '../../core/tweets.service'
import { Tweet } from '../../models/Tweet'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private isLoading: boolean = true
  private isError: boolean = false
  private tweets: Tweet[] = []

  constructor(private tweetService: TweetsService) {
  }

  ngOnInit() {
    this.tweetService
      .getTweets()
      .subscribe(
        tweets => (this.tweets = tweets),
        () => (this.isError = true),
        () => (this.isLoading = false),
      )
  }
}
