import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationGroupUserComponent } from './page/registration-group-user/registration-group-user.component';
import { RegistrationGroupUserRoutes } from './registration-group-user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupUserTableComponent } from './component/registration-group-user-table/group-user-table.component';
import { GroupUserFormComponent } from './component/registration-group-user-form/group-user-form.component';
import { GroupUserComponent } from './group-user/group-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    RouterModule.forChild(RegistrationGroupUserRoutes)
  ],
  declarations: [
    RegistrationGroupUserComponent,
    GroupUserTableComponent,
    GroupUserFormComponent,
    GroupUserComponent,
  ],
  providers:[MessageService, CookieService]
})
export class RegistrationGroupUserModule { }
