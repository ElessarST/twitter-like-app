import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { SharedModule } from '../shared/shared.module'
import { ProfileInfoComponent } from './profile-info/profile-info.component'
import { ProfileTweetsComponent } from './profile-tweets/profile-tweets.component'
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component'

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileInfoComponent,
    ProfileTweetsComponent,
    EditProfileDialogComponent,
  ],
  imports: [SharedModule, CommonModule],
  entryComponents: [EditProfileDialogComponent],
})
export class ProfilePageModule {}
