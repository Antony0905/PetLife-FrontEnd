import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewServicosContratadosPage } from './view-servicos-contratados.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServicosContratadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewServicosContratadosPage]
})
export class ViewServicosContratadosPageModule {}
