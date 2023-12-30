import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { registrationMemberRoutes } from './registration-member.routing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { IntegranteComponent } from './integrante/integrante.component';



@NgModule({
  declarations: [
    IntegranteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registrationMemberRoutes),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService,CookieService, ConfirmationService],
})
export class RegistrationMemberModule  { }
