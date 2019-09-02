import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload'
import { MaterialComponentsModule } from '../material-components/material-components.module'
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  exports: [
    MaterialComponentsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HeaderComponent,
  ],
})
export class SharedModule {}
