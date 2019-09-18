import { Component } from '@angular/core';
import { Anuncio } from 'src/models/anuncio';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/services/usuario.service';
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

  anuncio: Anuncio = {
    titulo: '',
    descricao: ''
  };

  msgReturn: string = '';


  cadastrarAnuncio() {

    this.anuncioService.novoAnuncio(this.anuncio)
      .subscribe((response) => {
        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        console.log(response);
        this.presentAlert(response);
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert(error.error);
          console.log(error);
        });

  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: ['OK']
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cadastrando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
