import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/models/anuncio';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AnuncioService } from 'src/services/anuncio.service';
import { AuthenticationService } from '../services/authentication.service';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioDTO } from 'src/models/usuario.dto';

@Component({
  selector: 'app-view-update-anuncio',
  templateUrl: './view-update-anuncio.page.html',
  styleUrls: ['./view-update-anuncio.page.scss'],
})
export class ViewUpdateAnuncioPage implements OnInit {

  anuncio = new Anuncio();
  showEdit = false;

  msgReturn: string;
  email: string;
  usuario: UsuarioDTO;
  isActive = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.anuncio.id = res.id;
      this.anuncio.descricao = res.descricao;
      this.anuncio.titulo = res.titulo;
      this.anuncio.preco = res.preco;
      this.anuncio.userId = res.userId;
      this.anuncio.dataCadastro = res.dataCadastro;
      this.anuncio.isActive = res.isActive;
      this.anuncio.segunda = res.segunda;
      this.anuncio.terca = res.terca;
      this.anuncio.quarta = res.quarta;
      this.anuncio.quinta = res.quinta;
      this.anuncio.sexta = res.sexta;
      this.anuncio.horario1 = res.horario1;
      this.anuncio.horario2 = res.horario2;
      this.anuncio.horario3 = res.horario3;


      console.log(this.anuncio.isActive);
      if (this.anuncio.isActive !== '1') {
        console.log('entrou');
        this.isActive = false;
      }

      console.log(this.anuncio);
    });
  }

  ngOnInit() {
  }

  showEditView() {
    this.validateTitleAndPriceBack();
    this.showEdit = true;
  }

  dismissEditView() {
    this.validateTitleAndPrice();
    this.showEdit = false;
    this.ionViewWillEnter();
  }

  atualizarAnuncio() {

    this.validateTitleAndPrice();
    this.anuncioService.atualizarAnuncio(this.anuncio)
      .subscribe((response2) => {
        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        this.presentAlert('Anuncio atualizado com sucesso!');
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert(error.error);
          console.log(error);
        });
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

  validateTitleAndPriceBack() {

    switch (this.anuncio.titulo) {
      case 'Passeio de Pets': {
        this.anuncio.titulo = '1';
        break;
      }
      case 'Hospedagem de Pets': {
        this.anuncio.titulo = '2';
        break;
      }
      case 'Banho de Pets': {
        this.anuncio.titulo = '3';
        break;
      }
      case 'Tosa de Pets': {
        this.anuncio.titulo = '4';
        break;
      }
      default: {
        break;
      }
    }

  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.navigateForward(['tabs/tabs/tab2']);
          //this.router.navigate(['tabs/tabs/tab2']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  deleteAnuncio(id: string) {

    this.anuncioService.deleteAnuncioById(id).subscribe((response) => {
      console.log(response);
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlert('Anuncio excluído com sucesso!');
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert(error.error);
        console.log(error);
      });
  }

}
