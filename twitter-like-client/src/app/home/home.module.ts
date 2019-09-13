import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomePageComponent } from './home-page/home-page.component'
import { SharedModule } from '../shared/shared.module'
import { FeedComponent } from './feed/feed.component'

@NgModule({
  declarations: [HomePageComponent, FeedComponent],
  imports: [SharedModule, CommonModule],
})
export class HomeModule {}
