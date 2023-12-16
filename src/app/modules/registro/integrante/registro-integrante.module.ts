import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { registroIntegranteRotas } from './registro-integrante.routing';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { RegistroIntegranteComponent } from './pagina/registro-integrante.component';
import { IntegranteEnderecoFormularioComponent } from './components/integrante-endereco-formulario/integrante-endereco-formulario.component';
import { IntegranteFormularioComponent } from './components/integrante-formulario/integrante-formulario.component';
import { IntegranteTabelaComponent } from './components/integrante-tabela/integrante-tabela.component';


@NgModule({
  declarations: [
    RegistroIntegranteComponent,
    IntegranteEnderecoFormularioComponent,
    IntegranteFormularioComponent,
    IntegranteTabelaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registroIntegranteRotas),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService,CookieService],
})
export class RegistroIntegranteModule  { }

