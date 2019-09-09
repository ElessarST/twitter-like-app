import { Component, Input, OnInit } from '@angular/core'
import { Tweet, User } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectCurrentUser } from '../../store/auth/selectors'
import { TweetsService } from '../../core/tweets.service'
import { updateTweet } from '../../store/feed/actions'
import { MatDialog } from '@angular/material'
import { RetweetModalComponent } from '../retweet-modal/retweet-modal.component'
import { ReplyModalComponent } from '../reply-modal/reply-modal.component'

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet
  @Input() hideActions?: boolean = false
  private currentUser: User

  constructor(
    private store: Store<IAppState>,
    private tweetService: TweetsService,
    private dialog: MatDialog,
  ) {
    this.store.select(selectCurrentUser).subscribe(user => (this.currentUser = user))
  }

  ngOnInit() {
  }

  get likedBy() {
    return this.tweet.likedBy || []
  }

  get replies() {
    return this.tweet.replies || []
  }

  get likesCount() {
    return this.likedBy.length
  }

  get repliesCount() {
    return this.replies.length
  }

  get isLiked() {
    return !!this.likedBy.find(likedBy => likedBy._id === this.currentUser._id)
  }

  like() {
    this.tweetService
      .likeTweet(this.tweet._id, !this.isLiked)
      .subscribe(({ data: tweet }) => this.store.dispatch(updateTweet({ tweet })))
  }

  openRetweetDialog() {
    const dialogRef = this.dialog.open(RetweetModalComponent, {
      data: { tweet: this.tweet },
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

  openReplyDialog() {
    const dialogRef = this.dialog.open(ReplyModalComponent, {
      data: { tweet: this.tweet },
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }
}
