import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [SharedModule, CommonModule],
})
export class ProfilePageModule {
}
