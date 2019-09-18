import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { AlertController } from '@Ionic/angular';
import { delay } from 'q';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  msgReturn: string = '';

  dataFromService: any = '';

  user: UsuarioDTO = {
    email: '',
    password: '',
    dataNascimento: new Date().toISOString(),
    nome: ''
  };

  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public loadingController: LoadingController) {

  }

  ngOnInit() {
  }

  registrar() {

    this.user.email = this.user.email;
    this.user.nome = this.user.nome;
    this.user.password = this.user.password;
    this.user.dataNascimento = this.user.dataNascimento;


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
          this.presentAlert(error.error);
          console.log(error);

        });

    console.log(this.user.email);
    console.log(this.user.password);
    console.log(this.user.dataNascimento);
    console.log(this.user.nome);
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
      message: 'Registrando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
