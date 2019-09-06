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

@NgModule({
  declarations: [
    SidebarComponent,
    CreateTweetComponent,
    PageTitleComponent,
    AvatarComponent,
    TweetComponent,
    ServerErrorComponent,
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule,
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
  ],
})
export class SharedModule {}
