import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from 'src/services/authenticate.service';
import { Anuncio } from 'src/models/anuncio';
import { AnuncioService } from 'src/services/anuncio.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController) { }

  anuncios: Anuncio[];

  ionViewWillEnter() {

    this.anuncioService.findAll().subscribe((response) => {
      this.anuncios = response;
      console.log(this.anuncios);
    },
      error => {
        console.log(error);
      });
  }


}
