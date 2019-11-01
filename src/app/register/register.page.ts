import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AlertController } from '@Ionic/angular';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { Endereco } from '../models/endereco';
import { CepService } from '../services/cep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  msgReturn = '';
  dataFromService: any = '';
  user = new UsuarioDTO();
  endereco = new Endereco();

  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public cepService: CepService,
    public loadingController: LoadingController,
    private router: Router) {

  }

  ngOnInit() {
  }

  registrar() {

    this.user.dataCadastro = new Date().toISOString();
    this.usuarioService.registrar(this.user)
      .subscribe((response) => {
        this.msgReturn = 'SUCESSO';
        this.dataFromService = JSON.stringify(response);
        this.presentLoading();
        console.log(response);
        this.presentAlert(response);
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlertCepError(error.error);
          console.log(error);

        });
  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }


  async presentAlertCepError(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: ['OK']
    });
    console.log('Alerta');
    alert.present();

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registrando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  buscarEndereco() {
    this.cepService.buscar(this.user.cep).subscribe((response) => {
      this.endereco = response;
      this.incluirEnderecoNoAnuncio(this.endereco);
      console.log(this.endereco);
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentAlertCepError('Não foi possível localizar o CEP informado ' + this.user.cep);
      });
  }

  incluirEnderecoNoAnuncio(endereco: Endereco) {

    this.user.cep = this.endereco.cep;
    this.user.bairro = this.endereco.bairro;
    this.user.cidade = this.endereco.localidade;
    this.user.complemento = this.endereco.complemento;
    this.user.estado = this.endereco.uf;
    this.user.logradouro = this.endereco.logradouro;

  }

}
