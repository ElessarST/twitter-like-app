import { Component, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsLoading, selectSortedFeed } from '../../store/feed/selectors'
import { Observable } from 'rxjs'
import { addReply, addRetweet, getFeed, updateTweet } from '../../store/feed/actions'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private isLoading: boolean = true
  private tweets$: Observable<Tweet[]>

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.dispatch(getFeed({}))
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading))
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
}
