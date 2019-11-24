import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { Authenticate } from 'src/models/authenticate';
import { AuthenticateService } from 'src/services/authenticate.service';
import { AuthenticateResponse } from 'src/models/authenticate.response';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalParameters } from '../config/global-parameters';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  msgHeader: string = '';
  msgBody: string = '';
  backButtonSubscription;

  auth: Authenticate = {
    email: '',
    password: ''
  };

  public authResponse: AuthenticateResponse;

  constructor(
    public navCtrl: NavController,
    public authenticateService: AuthenticateService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public parameters: GlobalParameters,
    public platform: Platform
  ) {

    //this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(666666, () => {

      //alert(this.constructor.name);
      //if (this.constructor.name === 'HomePage') {
        //if (window.confirm('Deseja realmente sair do app?')) {
          //navigator['app'].exitApp();
        //}
      //}
    //});

  }

  ngOnInit() {
  }


  login() {

    this.authenticateService.autenticar(this.auth).subscribe((response) => {

      this.parameters.setUsuarioLogado(response);
      this.authResponse = this.parameters.getUsuarioLogado();

      console.log(this.authResponse.authenticate);

      if (this.authResponse.authenticate) {
        console.log('Bem vindo ' + this.authResponse.nome);
        this.presentLoading();
        this.logon(this.auth.email);
      } else {
        this.msgHeader = 'Authenticate Failure';
        this.msgBody = 'Usuário ou Senha inválidos!';
        this.presentLoading();
        this.presentAlert();
      }
    },
      error => {
        console.log(error);
      });
  }

  async logon(userEmail: string) {
    await setTimeout(() => { this.authService.login(userEmail); }, 2000);
  }

  register() {
    this.navCtrl.navigateForward('register');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.msgHeader,
      message: this.msgBody,
      buttons: ['OK']
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Autenticando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
