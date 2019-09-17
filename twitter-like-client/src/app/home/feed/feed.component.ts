import { Component, OnDestroy, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsHasMore, selectIsLoading, selectIsLoadingMore, selectSortedFeed } from '../../store/feed/selectors'
import { Observable, Subject } from 'rxjs'
import { addReply, addRetweet, getFeed, loadMore, updateTweet } from '../../store/feed/actions'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>()
  public isLoading: boolean = true
  public isLoadingMore: boolean = false
  public isHasMore: boolean = false
  public tweets$: Observable<Tweet[]>

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(getFeed())
    this.store
      .select(selectIsLoading)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isLoading => (this.isLoading = isLoading))
    this.store
      .select(selectIsLoadingMore)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isLoading => (this.isLoadingMore = isLoading))
    this.store
      .select(selectIsHasMore)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isHasMore => (this.isHasMore = isHasMore))
    this.tweets$ = this.store.select(selectSortedFeed)
  }

  getId(tweet: Tweet) {
    return tweet._id
  }

  onReply(tweet: Tweet, reply: Tweet) {
    this.store.dispatch(addReply({ reply, tweet }))
  }

  onRetweet(tweet: Tweet, retweet: Tweet) {
    this.store.dispatch(addRetweet({ retweet, tweet }))
  }

  onLike(tweet: Tweet) {
    this.store.dispatch(updateTweet({ tweet }))
  }

  loadMore() {
    this.store.dispatch(loadMore())
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
