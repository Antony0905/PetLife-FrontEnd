import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Anuncio } from 'src/models/anuncio';
import { AnuncioService } from 'src/services/anuncio.service';
import { Router } from '@angular/router';

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
    public loadingController: LoadingController,
    private router: Router) { }

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

  viewAnuncio(anuncio: Anuncio) {
    console.log(anuncio);
    this.router.navigate(['/view-anuncio'], {
      queryParams: anuncio
    });
  }


}
