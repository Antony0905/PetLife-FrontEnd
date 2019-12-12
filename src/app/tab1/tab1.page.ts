import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Anuncio } from 'src/models/anuncio';
import { AnuncioService } from 'src/services/anuncio.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioDTO } from 'src/models/usuario.dto';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private usuarioService: UsuarioService) { }

  anuncios: Anuncio[];
  usuario = new UsuarioDTO();
  cidades: string[];
  cidade = '';
  servico = '';

  ionViewWillEnter() {

    console.log('Cidade e servico' + this.servico + this.cidade);

    if (!(this.cidade === 'Todos' && this.servico === '' || this.servico === 'Todos' && this.cidade === '')) {  
      
      if (this.cidade === '' && this.servico === '') {
        this.anuncioService.findAll().subscribe((response) => {
          this.anuncios = response;
          console.log(this.anuncios);
        },
          error => {
            console.log(error);
          });
      } else {

        console.log('Entrou no filtro ' + this.servico + this.cidade);
        this.anuncioService.findAllWithParameters(this.cidade, this.servico).subscribe(res => {
          this.anuncios = res;
          console.log(this.anuncios);
        },
          error => {
            console.log(error);
          });
          
      }
    }

    this.usuarioService.findAllCities().subscribe(res => {
      this.cidades = res;
      console.log(this.cidades);
    });
    
  }

  viewAnuncio(anuncio: Anuncio) {
    console.log(anuncio);
    this.router.navigate(['/view-anuncio'], {
      queryParams: anuncio
    });
  }

  viewProfile(userId: string) {

    console.log(userId);
    this.usuarioService.findUserById(userId).subscribe(res => {

      this.usuario = res;

      this.router.navigate(['/view-profile'], {
        queryParams: this.usuario
      });
    });
  }

  changeSelectedCity(event) {
    this.cidade = event.detail.value;
    console.log(event.detail.value);
    this.ionViewWillEnter();
  }

  changeSelectedService(event) {
    this.servico = event.detail.value;
    console.log(event.detail.value);
    this.ionViewWillEnter();
  }

}
