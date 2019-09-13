import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Tweet, User } from '../../models'
import { Store } from '@ngrx/store'
import { IAppState } from '../../store/app/state'
import { selectCurrentUser } from '../../store/auth/selectors'
import { TweetsService } from '../../core/tweets.service'
import { MatDialog } from '@angular/material'
import { RetweetModalComponent } from '../retweet-modal/retweet-modal.component'
import { ReplyModalComponent } from '../reply-modal/reply-modal.component'
import { Router } from '@angular/router'
import { PhotoPreviewComponent } from '../photo-preview/photo-preview.component'

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet
  @Input() hideActions?: boolean = false
  @Input() hideSubTweets?: boolean = false
  @Output() onReply: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Output() onRetweet: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Output() onLike: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  private currentUser: User

  constructor(
    private store: Store<IAppState>,
    private tweetService: TweetsService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.store.select(selectCurrentUser).subscribe(user => (this.currentUser = user))
  }

  ngOnInit() {}

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

  like(event) {
    event.stopPropagation()
    this.tweetService
      .likeTweet(this.tweet._id, !this.isLiked)
      .subscribe(({ data: tweet }) => this.onLike.emit(tweet))
  }

  openDialog(event, dialog, onCreate) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(dialog, {
      data: { tweet: this.tweet },
    })

    dialogRef.afterClosed().subscribe(tweet => {
      if (tweet) {
        onCreate(tweet)
      }
    })
  }

  openRetweetDialog(event) {
    this.openDialog(event, RetweetModalComponent, tweet => this.onRetweet.emit(tweet))
  }

  openReplyDialog(event) {
    this.openDialog(event, ReplyModalComponent, tweet => this.onReply.emit(tweet))
  }

  goToTweet() {
    this.router.navigate(['tweet', this.tweet._id])
  }

  openPreview(event, photo) {
    event.stopPropagation()
    this.dialog.open(PhotoPreviewComponent, {
      data: photo,
    })
  }
}
