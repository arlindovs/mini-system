import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationGroupProductComponent } from './page/registration-group-product/registration-group-product.component';
import { GroupProductFormComponent } from './component/registration-group-product-form/group-product-form/group-product-form.component';
import { GroupProductTableComponent } from './component/registration-group-product-table/group-product-table/group-product-table.component';
import { registrationGroupProductRoutes } from './registration-group-product.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registrationGroupProductRoutes),
    PrimengModule,
    SharedModule
  ],
  declarations: [
    RegistrationGroupProductComponent,
    GroupProductTableComponent,
    GroupProductFormComponent
  ],
  providers:[MessageService, CookieService]
})
export class RegistrationGroupProductModule { }
