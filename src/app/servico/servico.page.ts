import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Anuncio } from 'src/models/anuncio';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { AnuncioService } from 'src/services/anuncio.service';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  anuncio = new Anuncio();

  msgReturn: string;
  email: string;
  usuario: UsuarioDTO;

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.anuncio.titulo = '1';
  }

  cadastrarAnuncio() {

    this.authService.getUser().then((val) => {

      this.email = val;
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;
        this.anuncio.userId = this.usuario.id;

        this.validateTitleAndPrice();

        this.anuncioService.novoAnuncio(this.anuncio)
          .subscribe((response2) => {
            this.msgReturn = 'SUCESSO';
            this.presentLoading();
            console.log(response2);
            this.presentAlert(response2);
          },
            error => {
              this.msgReturn = 'ERROR';
              this.presentLoading();
              this.presentAlert(error.error);
              console.log(error);
            });
      },
        error => {
          console.log(error);
          return null;
        });
    });

  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['tabs/tabs/tab2']);
        }
      }]
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

  validateTitleAndPrice() {

    switch (this.anuncio.titulo) {
      case '1': {
        this.anuncio.titulo = 'Passeio de Pets';
        this.anuncio.preco = '100.00';
        break;
      }
      case '2': {
        this.anuncio.titulo = 'Hospedagem de Pets';
        this.anuncio.preco = '150.00';
        break;
      }
      case '3': {
        this.anuncio.titulo = 'Banho de Pets';
        this.anuncio.preco = '50.00';
        break;
      }
      case '4': {
        this.anuncio.titulo = 'Tosa de Pets';
        this.anuncio.preco = '50.00';
        break;
      }
      default: {
        break;
      }
    }

  }

}
