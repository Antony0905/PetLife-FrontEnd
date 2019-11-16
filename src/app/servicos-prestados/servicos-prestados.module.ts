import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosPrestadosPage } from './servicos-prestados.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPrestadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicosPrestadosPage]
})
export class ServicosPrestadosPageModule {}
