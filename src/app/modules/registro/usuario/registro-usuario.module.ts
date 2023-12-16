import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { registroUsuarioRotas } from './registro-usuario.routing';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioFormularioComponent } from './components/usuario-formulario/usuario-formulario.component';
import { RegistroUsuarioComponent } from './pagina/registro-usuario.component';
import { UsuarioTabelaComponent } from './components/usuario-tabela/usuario-tabela.component';




@NgModule({
  declarations: [
    RegistroUsuarioComponent,
    UsuarioTabelaComponent,
    UsuarioFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registroUsuarioRotas),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService,CookieService],
})
export class RegistroUsuarioModule  { }