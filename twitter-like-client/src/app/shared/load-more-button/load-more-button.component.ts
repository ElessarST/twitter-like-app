import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss'],
})
export class LoadMoreButtonComponent implements OnInit {
  @Input() isLoading: boolean
  @Input() isHasMore: boolean
  @Output() onLoadMore: EventEmitter<void> = new EventEmitter<void>()

  constructor() {}

  ngOnInit() {}

  loadMore() {
    this.onLoadMore.emit()
  }
}
