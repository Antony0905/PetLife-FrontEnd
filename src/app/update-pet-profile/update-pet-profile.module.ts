import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePetProfilePage } from './update-pet-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePetProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatePetProfilePage]
})
export class UpdatePetProfilePageModule {}
