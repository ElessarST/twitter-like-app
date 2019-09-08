import { Component, Input, OnInit } from '@angular/core'
import { Tweet, User } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectCurrentUser } from '../../store/auth/selectors'
import { TweetsService } from '../../core/tweets.service'
import { updateTweet } from '../../store/feed/actions'

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet
  private currentUser: User

  constructor(private store: Store<IAppState>, private tweetService: TweetsService) {
    this.store.select(selectCurrentUser).subscribe(user => (this.currentUser = user))
  }

  ngOnInit() {
  }

  get likedBy() {
    return this.tweet.likedBy || []
  }

  get likesCount() {
    return this.likedBy.length
  }

  get isLiked() {
    return !!this.likedBy.find(likedBy => likedBy._id === this.currentUser._id)
  }

  like() {
    this.tweetService
      .likeTweet(this.tweet._id, !this.isLiked)
      .subscribe(({ data: tweet }) => this.store.dispatch(updateTweet({ tweet })), () => null)
  }
}
