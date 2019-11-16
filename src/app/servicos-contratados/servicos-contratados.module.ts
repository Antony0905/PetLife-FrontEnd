import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosContratadosPage } from './servicos-contratados.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosContratadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicosContratadosPage]
})
export class ServicosContratadosPageModule {}
