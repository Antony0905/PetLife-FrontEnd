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
  ) {
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


  logout() {
    this.authService.logout();
  }


}
