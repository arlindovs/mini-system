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
    path: 'registration-user',
    loadChildren: () =>
      import('./modules/registration/user/registration-user.module').then(
        (m) => m.RegistrationUserModule
      ),
  },
  {
    path: 'registration-member',
    loadChildren: () =>
      import('./modules/registration/member/registration-member.module').then(
        (m) => m.RegistrationMemberModule
      ),
  },
  {
    path:'registration-product',
    loadChildren:() => import('./modules/registration/product/registration-product.module').then((m) => m.RegistrationProductModule),
  },
  {
    path:'registration-unitMeasure',
    loadChildren:() => import('./modules/registration/unitMeasure/registration-unitMeasure.module').then((m) => m.RegistrationUnitMeasureModule)
  },
  {
    path:'registration/group/member',
    loadChildren:() => import('./modules/registration/group/member/registration-group-member.module').then((m) => m.RegistrationGroupMemberModule)
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
