import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { IntegranteComponent } from './integrante/integrante.component';
import { integranteRota } from './integrante.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    RouterModule.forChild(integranteRota)
  ],
  declarations: [IntegranteComponent],
  providers: [
    MessageService,
    CookieService,
    ConfirmationService
  ],
})
export class IntegranteModule { }
