import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { PrimengModule } from './primeng.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  providers: [CookieService, { provide: LOCALE_ID, useValue: 'pt-BR' }],

  providers: [CookieService],

  bootstrap: [AppComponent]
})
export class AppModule { }
