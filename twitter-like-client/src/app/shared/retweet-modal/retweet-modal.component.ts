import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Tweet } from '../../models'

type RetweetData = {
  tweet: Tweet
}

@Component({
  selector: 'app-retweet-modal',
  templateUrl: './retweet-modal.component.html',
  styleUrls: ['./retweet-modal.component.scss'],
})
export class RetweetModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RetweetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RetweetData
  ) {}

  get tweet() {
    return this.data.tweet
  }

  ngOnInit() {}

  onCreate(tweet) {
    this.dialogRef.close(tweet)
  }
}
