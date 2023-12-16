import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { registroUnidadeMedidaRotas } from './registro-unidadeMedida.routing';
import { RegistroUnidadeMedidaComponent } from './pagina/registro-unidadeMedida.component';
import { UnidadeMedidaTabelaComponent } from './components/unidadeMedida-tabela/unidadeMedida-tabela.component';
import { unidadeMedidaFormularioComponent } from './components/unidadeMedida-formulario/unitMeasure-form/unidadeMedida-formulario.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registroUnidadeMedidaRotas),
    PrimengModule
  ],
  declarations: [
    RegistroUnidadeMedidaComponent,
    UnidadeMedidaTabelaComponent,
    unidadeMedidaFormularioComponent
  ],
  providers:[MessageService, CookieService]
})
export class RegistroUnidadeMedidaModule { }
