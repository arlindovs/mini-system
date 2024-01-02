import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationUserComponent } from './page/registration-user/registration-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationUserRoutes } from './registration-user.routing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    RegistrationUserComponent,
    UserTableComponent,
    UserFormComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(RegistrationUserRoutes),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService,CookieService,ConfirmationService],
})
export class RegistrationUserModule  { }
