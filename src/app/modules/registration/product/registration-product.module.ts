import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationProductComponent } from 'src/app/modules/registration/product/page/registration-product/registration-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { registrationProductRoutes } from './registration-product.routing';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';



@NgModule({
  declarations: [
    RegistrationProductComponent,
    ProductTableComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registrationProductRoutes),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService,CookieService],
})
export class RegistrationProductModule  { }
