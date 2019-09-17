import { Component, OnDestroy, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import {
  selectIsHasMore,
  selectIsLoadingMore,
  selectIsTweetsLoading,
  selectTweetsSorted,
  selectUser,
} from '../../store/profile/selectors'
import { addReply, addRetweet, loadMore, updateTweet } from '../../store/profile/actions'
import { filter, map, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-profile-tweets',
  templateUrl: './profile-tweets.component.html',
  styleUrls: ['./profile-tweets.component.scss'],
})
export class ProfileTweetsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>()
  public username: string
  public tweets: Tweet[]
  public isLoadingMore: boolean = false
  public isHasMore: boolean = false
  public isLoading: boolean

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store
      .select(selectUser)
      .pipe(
        takeUntil(this.unsubscribe),
        filter(u => !!u),
        map(u => u.username)
      )
      .subscribe(username => (this.username = username))
    this.store
      .select(selectTweetsSorted)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(tweets => (this.tweets = tweets))
    this.store
      .select(selectIsLoadingMore)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isLoading => (this.isLoadingMore = isLoading))
    this.store
      .select(selectIsHasMore)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isHasMore => (this.isHasMore = isHasMore))
    this.store
      .select(selectIsTweetsLoading)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isLoading => (this.isLoading = isLoading))
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

  getTweetId(tweet: Tweet) {
    return tweet._id
  }

  loadMore() {
    console.log(this.username)
    this.store.dispatch(loadMore({ username: this.username }))
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
