import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { registroGrupoIntegranteRotas } from './registro-grupo-integrante.routing';
import { RegistroGrupoIntegranteComponent } from './pagina/registro-grupo-integrante.component';
import { GrupoIntegranteFormularioComponent } from './components/registro-grupo-integrante-formulario/grupo-integrante-formulario.component';
import { GrupoIntegranteTabelaComponent } from './components/registro-grupo-integrante-tabela/grupo-integrante-tabela.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registroGrupoIntegranteRotas),
    PrimengModule,
    SharedModule
  ],
  declarations: [
    RegistroGrupoIntegranteComponent,
    GrupoIntegranteFormularioComponent,
    GrupoIntegranteTabelaComponent
  ],
  providers:[MessageService,CookieService]
})
export class RegistroGrupoIntegranteModule { }
