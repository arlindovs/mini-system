import { NgModule } from '@angular/core';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationUserRoutes } from './registration-user.routing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { UserComponent } from './user/user.component';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    RouterModule.forChild(RegistrationUserRoutes)
  ],
  declarations: [
    UserComponent,
  ],
  providers: [MessageService,CookieService,ConfirmationService],
})
export class RegistrationUserModule  { }
