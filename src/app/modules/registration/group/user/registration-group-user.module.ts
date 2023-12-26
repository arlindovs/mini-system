import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationGroupUserRoutes } from './registration-group-user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from 'src/app/shared/shared.module';
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
    GroupUserComponent,
  ],
  providers:[MessageService, CookieService]
})
export class RegistrationGroupUserModule { }
