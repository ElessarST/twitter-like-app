import { Component, Input, OnInit } from '@angular/core'
import { Location } from '@angular/common'

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() public title: string
  @Input() public canGoBack?: boolean = false

  constructor(private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back()
  }
}
