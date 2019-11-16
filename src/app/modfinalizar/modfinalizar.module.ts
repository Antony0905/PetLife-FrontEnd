import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModfinalizarPage } from './modfinalizar.page';

const routes: Routes = [
  {
    path: '',
    component: ModfinalizarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModfinalizarPage]
})
export class ModfinalizarPageModule {}
