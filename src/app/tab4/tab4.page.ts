import { Component, OnDestroy } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthenticateResponse } from 'src/models/authenticate.response';
import { GlobalParameters } from '../config/global-parameters';
import { AuthenticationService } from '../services/authentication.service';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { Observable } from 'rxjs';
import { CepService } from '../services/cep.service';
import { Endereco } from '../models/endereco';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageService } from '../services/image.service';
import { UserImage } from '../models/user.image';
import { RouterPage } from '../services/abstract-router-page';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page extends RouterPage implements OnDestroy {

  auth: AuthenticateResponse;
  usuario = new UsuarioDTO();
  email: string;
  showEdit = false;
  msgReturn = '';
  endereco = new Endereco();
  dataNascimento;
  dataCadastro;
  files: Observable<any[]>;
  userImage = new UserImage();
  userImageSave = new UserImage();

  constructor(
    public navCtrl: NavController,
    public authService: AuthenticationService,
    public parameters: GlobalParameters,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public cepService: CepService,
    public loadingController: LoadingController,
    private router: Router,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {
    super(router, route);
  }

  onEnter() {

    this.authService.getUser().then((val) => {
      this.email = val;
      console.log('USER LOGGIN: ' + this.email);

      this.usuarioService.findUserByEmail(this.email).subscribe((res) => {
        this.usuario.nome = res.nome;
        this.usuario.id = res.id;
        this.usuario.bairro = res.bairro;
        this.usuario.cep = res.cep;
        this.usuario.cidade = res.cidade;
        this.usuario.complemento = res.complemento;
        this.dataNascimento = moment(res.dataNascimento).format('DD/MM/YYYY');
        this.dataCadastro = moment(res.dataCadastro).format('DD/MM/YYYY');
        this.usuario.dataCadastro = res.dataCadastro;
        this.usuario.dataNascimento = new Date(res.dataNascimento).toISOString();
        this.usuario.email = res.email;
        this.usuario.estado = res.estado;
        this.usuario.logradouro = res.logradouro;
        this.usuario.numero = res.numero;
        this.usuario.password = res.password;
        this.usuario.dataAtualizacao = res.dataAtualizacao;
        this.usuario.email = res.email;
        this.usuario.rate = res.rate;
        this.usuario.ddd = res.ddd;
        this.usuario.telefone = res.telefone;

        this.imageService.findByUserId(this.usuario.id).subscribe(res2 => {
          this.userImage = res2;
        });

      },
        error => {
          console.log(error);
        });
    });

  }


  logout() {
    this.authService.logout();
  }

  editProfile() {
    this.showEdit = true;
  }

  cancelEditProfile() {
    this.showEdit = false;
  }


  buscarEndereco() {
    this.cepService.buscar(this.usuario.cep).subscribe((response) => {
      this.endereco = response;
      this.incluirEnderecoNoAnuncio(this.endereco);
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentAlert('Não foi possível localizar o CEP informado ' + this.usuario.cep);
        console.log(error);
      });
  }

  incluirEnderecoNoAnuncio(endereco: Endereco) {

    this.usuario.cep = this.endereco.cep;
    this.usuario.bairro = this.endereco.bairro;
    this.usuario.cidade = this.endereco.localidade;
    this.usuario.complemento = this.endereco.complemento;
    this.usuario.estado = this.endereco.uf;
    this.usuario.logradouro = this.endereco.logradouro;

  }
  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.showEdit = false;
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentAlertPhotoProfile(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['update-profile']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Atualizando Usuário',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingPhotoProfile() {
    const loading = await this.loadingController.create({
      message: 'Atualizando foto de perfil',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  updateProfile() {

    this.usuario.dataAtualizacao = new Date().toISOString();
    console.log(this.usuario.dataNascimento);
    this.usuarioService.update(this.usuario)
      .subscribe((response) => {
        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        console.log(response);
        this.presentAlert('Usuario atualizado com sucesso!');
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert('Ocorreu erro ao atualizar o perfil. Por favor tente novamente mais tarde.');
          console.log(error);
        });
  }

  servicosContratados() {
    this.router.navigate(['/servicos-contratados']);
  }

  servicosPrestados() {
    this.router.navigate(['/servicos-prestados']);
  }


  PickFileAndGetBase64String() {
    this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((nativepath) => {
        this.base64.encodeFile(nativepath).then((base64string) => {

          this.userImageSave.userId = this.usuario.id;
          this.userImageSave.base64 = base64string;

          this.imageService.saveImage(this.userImageSave).subscribe(res => {
            this.msgReturn = 'SUCESSO';
            this.presentLoadingPhotoProfile();
            console.log(res);
            this.presentAlertPhotoProfile('Foto de perfil atualizada com sucesso.');
          },
            error => {
              this.msgReturn = 'ERROR';
              this.presentLoadingPhotoProfile();
              this.presentAlert('Ocorreu erro ao atualizar foto de perfil. Por favor tente novamente mais tarde.');
              console.log(error);
            });
        });
      });
    });

  }

  onDestroy() {
    super.ngOnDestroy();
  }

}
