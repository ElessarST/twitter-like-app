import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FavoritesPageComponent } from './favorites-page/favorites-page.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [FavoritesPageComponent],
  imports: [SharedModule, CommonModule],
})
export class FavoritesPageModule {}
