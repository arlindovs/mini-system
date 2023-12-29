import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationGroupMemberRoutes } from './registration-group-member.routing';
import { GroupMemberComponent } from './group-member/group-member.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(RegistrationGroupMemberRoutes),
    PrimengModule,
    SharedModule
  ],
  declarations: [
    GroupMemberComponent,
  ],
  providers:[MessageService,CookieService, ConfirmationService]
})
export class RegistrationGroupMemberModule { }
