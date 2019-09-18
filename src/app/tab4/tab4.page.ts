import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateResponse } from 'src/models/authenticate.response';
import { GlobalParameters } from '../config/global-parameters';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  auth: AuthenticateResponse;

  constructor(public navCtrl: NavController, public authService: AuthenticationService, public parameters: GlobalParameters) { }

  logout() {

    //this.auth = this.parameters.getUsuarioLogado();
    //console.log(this.auth.nome);
    //this.parameters.removeUsuarioLogado();
    //this.auth = this.parameters.getUsuarioLogado();
    //console.log(this.auth.nome);
    this.authService.logout();

  }

}
