import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'registro-usuario',
    loadChildren: () =>
      import('./modules/registro/usuario/registro-usuario.module').then(
        (m) => m.RegistroUsuarioModule
      ),
  },
  {
    path: 'registro-integrante',
    loadChildren: () =>
      import('./modules/registro/integrante/registro-integrante.module').then(
        (m) => m.RegistroIntegranteModule
      ),
  },
  {
    path:'registro-produto',
    loadChildren:() => import('./modules/registro/produto/registro-produto.module').then((m) => m.RegistroProdutoModule),
  },
  {
    path:'registro-unidadeMedida',
    loadChildren:() => import('./modules/registro/unidadeMedida/registro-unidadeMedida.module').then((m) => m.RegistroUnidadeMedidaModule)
  },
  {
    path:'registration/group/member',
    loadChildren:() => import('./modules/registro/grupo/integrante/registro-grupo-integrante.module').then((m) => m.RegistroGrupoIntegranteModule)
  },
  {
    path:'registration/group/product',
    loadChildren:() => import ('./modules/registro/grupo/produto/registro-grupo-produto.module').then((m) => m.RegistroGrupoProdutoModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
