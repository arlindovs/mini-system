import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { PrimengModule } from './libraries/primeng.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './modules/footer/footer.component';
import { MessageService } from 'primeng/api';
import { ProductComponent } from './modules/registration/product/registration-product.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    FooterComponent,
    ProductComponent,
  ],
  imports: [
    PrimengModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],

  providers: [
    CookieService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
