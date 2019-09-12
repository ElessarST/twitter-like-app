import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { addReply, addRetweet, getFavorites, updateTweet } from '../../store/favorites/actions'
import { selectIsLoading, selectSortedFavorites } from '../../store/favorites/selectors'
import { Tweet } from '../../models'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  private isLoading: boolean = true
  private tweets$: Observable<Tweet[]>

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.dispatch(getFavorites({}))
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading))
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
}
