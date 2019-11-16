import { Component, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Anuncio } from 'src/models/anuncio';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { AnuncioService } from 'src/services/anuncio.service';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterPage } from '../services/abstract-router-page';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page extends RouterPage implements OnDestroy {

  constructor(
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(router, route);
  }

  anuncios: Anuncio[];
  email: string;
  usuario: UsuarioDTO;

  onEnter() {

    this.authService.getUser().then((val) => {

      this.email = val;
      console.log(this.email);
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;
        console.log(this.usuario);
        this.anuncioService.findByUserId(this.usuario.id).subscribe((response2) => {
          this.anuncios = response2;

          this.anuncios.forEach(anuncio => {
            anuncio.dataCadastroFormatted = moment(anuncio.dataCadastro).format('DD-MM-YYYY HH:MM:SS');
          });
          console.log(this.anuncios);
        },
          error => {
            console.log(error);
          });

      },
        error => {
          console.log(error);
          return null;
        });
    });

  }

  pageServicos() {
    this.navCtrl.navigateForward('servico');
  }

  viewOrUpdateAnuncio(anuncio: Anuncio) {
    console.log(anuncio);
    this.router.navigate(['/view-update-anuncio'], {
      queryParams: anuncio
    });
  }


  onDestroy() {
    super.ngOnDestroy();
  }

}
