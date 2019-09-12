import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload'
import { MaterialComponentsModule } from '../material-components/material-components.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { RouterModule } from '@angular/router'
import { CreateTweetComponent } from './create-tweet/create-tweet.component'
import { PageTitleComponent } from './page-title/page-title.component'
import { AvatarComponent } from './avatar/avatar.component'
import { TweetComponent } from './tweet/tweet.component'
import { ServerErrorComponent } from './server-error/server-error.component'
import { TweetDatePipe } from './tweet-date.pipe'
import { AlertsComponent } from './alerts/alerts.component'
import { RetweetModalComponent } from './retweet-modal/retweet-modal.component'
import { ReplyModalComponent } from './reply-modal/reply-modal.component'
import { UsersListComponent } from './users-list/users-list.component'
import { SearchPanelComponent } from './search-panel/search-panel.component'
import { LoadMoreButtonComponent } from './load-more-button/load-more-button.component'
import { PhotoPreviewComponent } from './photo-preview/photo-preview.component'

@NgModule({
  declarations: [
    SidebarComponent,
    CreateTweetComponent,
    PageTitleComponent,
    AvatarComponent,
    TweetComponent,
    ServerErrorComponent,
    TweetDatePipe,
    AlertsComponent,
    RetweetModalComponent,
    ReplyModalComponent,
    UsersListComponent,
    SearchPanelComponent,
    LoadMoreButtonComponent,
    PhotoPreviewComponent,
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule,
  ],
  entryComponents: [
    RetweetModalComponent,
    ReplyModalComponent,
    UsersListComponent,
    PhotoPreviewComponent,
  ],
  exports: [
    MaterialComponentsModule,
    ReactiveFormsModule,
    FileUploadModule,
    SidebarComponent,
    CreateTweetComponent,
    PageTitleComponent,
    AvatarComponent,
    RouterModule,
    TweetComponent,
    ServerErrorComponent,
    TweetDatePipe,
    AlertsComponent,
    RetweetModalComponent,
    UsersListComponent,
    SearchPanelComponent,
    LoadMoreButtonComponent,
    PhotoPreviewComponent,
  ],
})
export class SharedModule {}
