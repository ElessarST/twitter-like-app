import { Component, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { IAppState } from '../../store/app/state'
import { Store } from '@ngrx/store'
import { selectIsLoading, selectReplies, selectTweet } from '../../store/tweet/selectors'
import { ActivatedRoute } from '@angular/router'
import { getTweet, updateTweet } from '../../store/tweet/actions'

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.scss'],
})
export class TweetPageComponent implements OnInit {
  public tweet: Tweet
  public replies: Tweet[] = []
  public isLoading: boolean = true

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.select(selectTweet).subscribe(tweet => (this.tweet = tweet))
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading))
    this.store.select(selectReplies).subscribe(replies => (this.replies = replies))
    this.route.paramMap.subscribe(params =>
      this.store.dispatch(getTweet({ tweetId: params.get('tweetId') }))
    )
  }

  onLike(tweet) {
    this.store.dispatch(updateTweet({ tweet }))
  }

  onReply(reply) {
    const { replies } = this.tweet
    const tweet = { ...this.tweet, replies: [...replies, reply] }
    this.store.dispatch(updateTweet({ tweet }))
  }

  onRetweet() {
    const { retweetsCount } = this.tweet
    const tweet = { ...this.tweet, retweetsCount: retweetsCount + 1 }
    this.store.dispatch(updateTweet({ tweet }))
  }
}
