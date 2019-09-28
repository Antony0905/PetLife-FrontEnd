import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AnuncioService } from 'src/services/anuncio.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController) {

  }

  pageServicos() {
    this.navCtrl.navigateForward('servico');
  }

}
