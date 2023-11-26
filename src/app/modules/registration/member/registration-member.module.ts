import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationMemberComponent } from './page/registration-member/registration-member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { registrationMemberRoutes } from './registration-member.routing';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { MemberTableComponent } from './components/user-table/member-table.component';
import { MemberFormComponent } from './components/user-form/member-form.component';



@NgModule({
  declarations: [
    RegistrationMemberComponent,
    MemberTableComponent,
    MemberFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registrationMemberRoutes),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService,CookieService],
})
export class RegistrationMemberModule  { }
