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
  { path: 'servicos-contratados', loadChildren: './servicos-contratados/servicos-contratados.module#ServicosContratadosPageModule' },
  { path: 'view-servicos-contratados', loadChildren: './view-servicos-contratados/view-servicos-contratados.module#ViewServicosContratadosPageModule' },
  { path: 'servicos-prestados', loadChildren: './servicos-prestados/servicos-prestados.module#ServicosPrestadosPageModule' },
  { path: 'view-servicos-prestados', loadChildren: './view-servicos-prestados/view-servicos-prestados.module#ViewServicosPrestadosPageModule' },
  { path: 'modfinalizar', loadChildren: './modfinalizar/modfinalizar.module#ModfinalizarPageModule' },
  { path: 'modrelatarproblema', loadChildren: './modrelatarproblema/modrelatarproblema.module#ModrelatarproblemaPageModule' },
  { path: 'view-profile', loadChildren: './view-profile/view-profile.module#ViewProfilePageModule' },
  { path: 'update-profile', loadChildren: './update-profile/update-profile.module#UpdateProfilePageModule' },
  { path: 'update-pet-profile', loadChildren: './update-pet-profile/update-pet-profile.module#UpdatePetProfilePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
