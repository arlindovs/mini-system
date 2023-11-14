import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { PrimengModule } from './primeng.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

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
  ],
<<<<<<< Updated upstream
  providers: [],
=======
  providers: [CookieService, { provide: LOCALE_ID, useValue: 'pt-BR' }],
>>>>>>> Stashed changes
  bootstrap: [AppComponent]
})
export class AppModule { }
