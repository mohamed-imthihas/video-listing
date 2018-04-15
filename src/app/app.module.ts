import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { ListPageComponent } from './list-page/list-page.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { VideoListingService } from './services/video-listing/video-listing.service';
import { FakeBackendService } from './fake-backend/fake-backend.service';
import { DefaultPosterDirective } from './directives/default-poster/default-poster.directive';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { ErrorService } from './error-alert/error.service';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    HeaderComponent,
    SearchBarComponent,    
    DefaultPosterDirective, ErrorAlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    InfiniteScrollModule
  ],
  providers: [VideoListingService, ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
