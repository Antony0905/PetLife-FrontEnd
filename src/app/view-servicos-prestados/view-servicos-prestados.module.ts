import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewServicosPrestadosPage } from './view-servicos-prestados.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServicosPrestadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewServicosPrestadosPage]
})
export class ViewServicosPrestadosPageModule {}
