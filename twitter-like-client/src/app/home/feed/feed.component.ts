import { Component, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsHasMore, selectIsLoading, selectIsLoadingMore, selectSortedFeed } from '../../store/feed/selectors'
import { Observable } from 'rxjs'
import { addReply, addRetweet, getFeed, loadMore, updateTweet } from '../../store/feed/actions'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private isLoading: boolean = true
  private isLoadingMore: boolean = false
  private isHasMore: boolean = false
  private tweets$: Observable<Tweet[]>

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.dispatch(getFeed({}))
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading))
    this.store.select(selectIsLoadingMore).subscribe(isLoading => (this.isLoadingMore = isLoading))
    this.store.select(selectIsHasMore).subscribe(isHasMore => (this.isHasMore = isHasMore))
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
    this.store.dispatch(loadMore({}))
  }
}
