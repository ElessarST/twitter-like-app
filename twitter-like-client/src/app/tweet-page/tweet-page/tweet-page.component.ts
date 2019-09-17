import { Component, OnDestroy, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { IAppState } from '../../store/app/state'
import { Store } from '@ngrx/store'
import { selectIsLoading, selectReplies, selectTweet } from '../../store/tweet/selectors'
import { ActivatedRoute } from '@angular/router'
import { getTweet, updateTweet } from '../../store/tweet/actions'
import { Subject } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.scss'],
})
export class TweetPageComponent implements OnInit, OnDestroy {
  public unsubscribe: Subject<void> = new Subject()
  public tweet: Tweet
  public replies: Tweet[] = []
  public isLoading: boolean = true

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store
      .select(selectTweet)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(tweet => (this.tweet = tweet))
    this.store
      .select(selectIsLoading)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isLoading => (this.isLoading = isLoading))
    this.store
      .select(selectReplies)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(replies => (this.replies = replies))
    this.route.paramMap
      .pipe(take(1))
      .subscribe(params => this.store.dispatch(getTweet({ tweetId: params.get('tweetId') })))
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

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
