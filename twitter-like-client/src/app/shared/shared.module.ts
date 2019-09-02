import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload'
import { MaterialComponentsModule } from '../material-components/material-components.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [SidebarComponent],
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
  ],
})
export class SharedModule {}
