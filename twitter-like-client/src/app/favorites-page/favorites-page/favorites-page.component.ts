import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { addReply, addRetweet, getFavorites, loadMore, updateTweet } from '../../store/favorites/actions'
import {
  selectIsHasMore,
  selectIsLoading,
  selectIsLoadingMore,
  selectSortedFavorites,
} from '../../store/favorites/selectors'
import { Tweet } from '../../models'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>()
  public isLoading: boolean = true
  public isLoadingMore: boolean = false
  public isHasMore: boolean = false
  public tweets$: Observable<Tweet[]>

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(getFavorites())
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
    this.tweets$ = this.store.select(selectSortedFavorites)
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
