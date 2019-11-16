import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModrelatarproblemaPage } from './modrelatarproblema.page';

const routes: Routes = [
  {
    path: '',
    component: ModrelatarproblemaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModrelatarproblemaPage]
})
export class ModrelatarproblemaPageModule {}
