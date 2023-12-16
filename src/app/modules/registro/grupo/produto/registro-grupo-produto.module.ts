import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { registroGrupoProdutoRotas } from './registro-grupo-produto.routing';
import { RegistroGrupoProdutoComponent } from './pagina/registro-grupo-produto.component';
import { GrupoProdutoFormularioComponent } from './component/registro-grupo-produto-formulario/grupo-produto-formulario.component';
import { GrupoProdutoTabelaComponent } from './component/registro-grupo-produto-tabela/grupo-produto-tabela.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registroGrupoProdutoRotas),
    PrimengModule,
    SharedModule
  ],
  declarations: [
    RegistroGrupoProdutoComponent,
    GrupoProdutoFormularioComponent,
    GrupoProdutoTabelaComponent
  ],
  providers:[MessageService, CookieService]
})
export class RegistroGrupoProdutoModule { }
