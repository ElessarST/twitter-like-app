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

@NgModule({
  declarations: [
    SidebarComponent,
    CreateTweetComponent,
    PageTitleComponent,
    AvatarComponent,
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
  ],
})
export class SharedModule {}
