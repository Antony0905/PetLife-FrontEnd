import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewUpdateAnuncioPage } from './view-update-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUpdateAnuncioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewUpdateAnuncioPage]
})
export class ViewUpdateAnuncioPageModule {}
