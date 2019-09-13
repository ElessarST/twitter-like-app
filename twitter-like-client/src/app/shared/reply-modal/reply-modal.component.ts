import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Tweet } from '../../models'

type ReplyData = {
  tweet: Tweet
}

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrls: ['./reply-modal.component.scss'],
})
export class ReplyModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ReplyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReplyData
  ) {}

  get tweet() {
    return this.data.tweet
  }

  ngOnInit() {}

  onCreate(tweet) {
    this.dialogRef.close(tweet)
  }
}
