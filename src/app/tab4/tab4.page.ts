import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthenticateResponse } from 'src/models/authenticate.response';
import { GlobalParameters } from '../config/global-parameters';
import { AuthenticationService } from '../services/authentication.service';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UploadFileService } from '../services/upload-file.service';
import { Observable } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  auth: AuthenticateResponse;
  nome: string;
  usuario: UsuarioDTO;
  email: string;

  files: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public authService: AuthenticationService,
    public parameters: GlobalParameters,
    public usuarioService: UsuarioService,
    private uploadFileService: UploadFileService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private iab: InAppBrowser
  ) {
    this.files = this.uploadFileService.getFiles();
  }

  ionViewWillEnter() {

    this.authService.getUser().then((val) => {
      this.email = val;
      console.log('USER LOGGIN: ' + this.email);

      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {
        this.usuario = response;
        console.log(this.usuario);
        this.nome = this.usuario.nome;
      },
        error => {
          console.log(error);
        });
    });
  }

  async addFile() {
    let inputAlert = this.alertCtrl.create({
      inputs: [
        {
          name: 'info',
          placeholder: 'Lorem Ipsum'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Store',
          handler: data => {
            this.uploadInformation(data.info);
          }
        }
      ]
    });
    (await inputAlert).present();
  }

  uploadInformation(text) {

    let upload = this.uploadFileService.uploadToStorage(text);

    upload.then().then(res => {
      console.log('res: ' + res);
      this.uploadFileService.storageInfoDataBase(res.metadata).then(async () => {
        let toast = this.toastCtrl.create({
          message: 'New file added!',
          duration: 3000
        });
        (await toast).present();
      });
    });
  }

  deleteFile(file) {
    this.uploadFileService.delteFile(file).subscribe(async () => {
      let toast = this.toastCtrl.create({
        message: 'File removed!',
        duration: 3000
      });
      (await toast).present();
    });
  }

  viewFile(url) {
    this.iab.create(url);
  }

  logout() {
    this.authService.logout();
  }


}
