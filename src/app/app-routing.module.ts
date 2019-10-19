import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'servico', loadChildren: './servico/servico.module#ServicoPageModule' },
  { path: 'view-anuncio', loadChildren: './view-anuncio/view-anuncio.module#ViewAnuncioPageModule' },
  { path: 'view-update-anuncio', loadChildren: './view-update-anuncio/view-update-anuncio.module#ViewUpdateAnuncioPageModule' },
  { path: 'register-pet', loadChildren: './register-pet/register-pet.module#RegisterPetPageModule' },
  { path: 'view-update-pet', loadChildren: './view-update-pet/view-update-pet.module#ViewUpdatePetPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
