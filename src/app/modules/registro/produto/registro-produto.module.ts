import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/libraries/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { registroProdutoRotas } from './registro-produto.routing';
import { RegistroProdutoComponent } from './pagina/registro-produto.component';
import { ProdutoTabelaComponent } from './components/produto-tabela/produto-tabela.component';
import { ProdutoFormularioComponent } from './components/produto-formulario/produto-formulario.component';




@NgModule({
  declarations: [
    RegistroProdutoComponent,
    ProdutoTabelaComponent,
    ProdutoFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(registroProdutoRotas),
    PrimengModule,
    SharedModule
  ],
  providers: [MessageService, CookieService],
})
export class RegistroProdutoModule  { }
