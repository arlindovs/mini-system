import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationUnitMeasureComponent } from './registration-unitMeasure/page/registration-unitMeasure/registration-unitMeasure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UnitMeasureFormComponent } from './registration-unitMeasure/component/unitMeasure-form/unitMeasure-form/unitMeasure-form.component';
import { UnitMeasureTableComponent } from './registration-unitMeasure/component/unitMeasure-table/unitMeasure-table/unitMeasure-table.component';
import { registrationUnitMeasureRoutes } from './registration-unitMeasure.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registrationUnitMeasureRoutes),
    PrimengModule
  ],
  declarations: [
    RegistrationUnitMeasureComponent,
    UnitMeasureFormComponent,
    UnitMeasureTableComponent
  ],
  providers:[MessageService, CookieService]
})
export class RegistrationUnitMeasureModule { }
