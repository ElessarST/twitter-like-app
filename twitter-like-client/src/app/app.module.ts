import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module'
import { HomeModule } from './home/home.module'
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { SharedModule } from './shared/shared.module'
import { appReducers } from './store/app/reducer'
import { AuthEffects } from './store/auth/effects'
import { FeedEffects } from './store/feed/effects'
import { TweetEffects } from './store/tweet/effects'
import { ProfileEffects } from './store/profile/effects'
import { TweetPageModule } from './tweet-page/tweet-page.module'
import { ProfilePageModule } from './profile-page/profile-page.module'
import { FavoritesEffects } from './store/favorites/effects'
import { FavoritesPageModule } from './favorites-page/favorites-page.module'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    HomeModule,
    ProfilePageModule,
    CoreModule,
    TweetPageModule,
    FavoritesPageModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      AuthEffects,
      FeedEffects,
      TweetEffects,
      ProfileEffects,
      FavoritesEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
