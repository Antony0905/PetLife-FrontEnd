import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AlertController } from '@Ionic/angular';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { Endereco } from '../models/endereco';
import { CepService } from '../services/cep.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  public fGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public cepService: CepService,
    public loadingController: LoadingController,
    private router: Router,
    private fBuilder: FormBuilder) {

    this.fGroup = this.fBuilder.group({

      'nome': [this.user.nome, Validators.compose([
        Validators.required
      ])],
      'dataNascimento': [this.user.dataNascimento, Validators.compose([
        Validators.required])],
      'ddd': [this.user.ddd, Validators.compose([
        Validators.required])],
      'telefone': [this.user.telefone, Validators.compose([
        Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      'email': [this.user.email, Validators.compose([
        Validators.required])],
      'Password': [this.user.password, Validators.compose([
        Validators.required])],
      'cep': [this.user.cep],
      'logradouro': [this.user.logradouro, Validators.compose([
        Validators.required])],
      'numero': [this.user.numero, Validators.compose([
        Validators.required])],
      'complemento': [this.user.complemento, Validators.compose([])],
      'Bairro': [this.user.bairro, Validators.compose([
        Validators.required])],
      'cidade': [this.user.cidade, Validators.compose([
        Validators.required])],
      'estado': [this.user.estado, Validators.compose([
        Validators.required])]
    })


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

    this.fGroup.valid
    console.log(this.fGroup.value);
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
