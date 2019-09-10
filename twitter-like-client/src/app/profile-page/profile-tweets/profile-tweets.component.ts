import { Component, OnInit } from '@angular/core'
import { Tweet } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectIsTweetsLoading, selectTweets } from '../../store/profile/selectors'
import { addReply, addRetweet, updateTweet } from '../../store/profile/actions'

@Component({
  selector: 'app-profile-tweets',
  templateUrl: './profile-tweets.component.html',
  styleUrls: ['./profile-tweets.component.scss'],
})
export class ProfileTweetsComponent implements OnInit {
  private tweets: Tweet[]
  private isLoading: boolean

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.select(selectTweets).subscribe(tweets => this.tweets = tweets)
    this.store.select(selectIsTweetsLoading).subscribe(isLoading => this.isLoading)
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
}
