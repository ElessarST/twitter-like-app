import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TweetPageComponent } from './tweet-page/tweet-page.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [TweetPageComponent],
  imports: [SharedModule, CommonModule],
})
export class TweetPageModule {}
