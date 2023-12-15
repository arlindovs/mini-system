import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationGroupMemberComponent } from './page/registration-group-member/registration-group-member.component';
import { GroupMemberFormComponent } from './component/registration-group-member-form/group-member-form/group-member-form.component';
import { GroupMemberTableComponent } from './component/registration-group-member-table/group-member-table/group-member-table.component';
import { registrationGroupMemberRoutes } from './registration-group-member.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registrationGroupMemberRoutes),
    PrimengModule,
    SharedModule
  ],
  declarations: [
    RegistrationGroupMemberComponent,
    GroupMemberFormComponent,
    GroupMemberTableComponent
  ],
  providers:[
    MessageService,
    CookieService
  ]
})
export class RegistrationGroupMemberModule { }
