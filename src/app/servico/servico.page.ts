import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/models/anuncio';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AnuncioService } from 'src/services/anuncio.service';
import { CepService } from '../services/cep.service';
import { Endereco } from '../models/endereco';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
})
export class ServicoPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public cepService: CepService) {

  }

  anuncio: Anuncio = {
    titulo: '',
    descricao: '',
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: ''
  };

  msgReturn: string;
  endereco: Endereco;


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
  ionViewWillEnter() {

    this.cepService.buscar('06867480').subscribe((response) => {
      this.endereco = response;
      console.log(this.endereco);
    },
      error => {
        console.log(error);
      });


  }


  ngOnInit() {
  }

}
