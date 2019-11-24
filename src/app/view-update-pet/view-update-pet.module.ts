import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewUpdatePetPage } from './view-update-pet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUpdatePetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes,
    ),
    ReactiveFormsModule
  ],
  declarations: [ViewUpdatePetPage]
})
export class ViewUpdatePetPageModule {}
