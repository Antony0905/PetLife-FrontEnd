import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agenda } from 'src/models/agenda';
import { Anuncio } from 'src/models/anuncio';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { AgendaService } from '../services/agenda.service';
import { AlertController } from '@Ionic/angular';
import { LoadingController } from '@ionic/angular';
import { PetService } from '../services/pet-service.service';
import { Pet } from '../models/pet';

@Component({
  selector: 'app-view-anuncio',
  templateUrl: './view-anuncio.page.html',
  styleUrls: ['./view-anuncio.page.scss'],
})
export class ViewAnuncioPage implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public agendaService: AgendaService,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public petService: PetService
  ) {

  }

  anuncio = new Anuncio();
  agenda = new Agenda();
  usuario = new UsuarioDTO();
  usuarioAnunciante = new UsuarioDTO();
  preco = 0;
  precoUnitario;
  count = 1;
  horario: string;
  email;
  msgReturn;
  pets: Pet[];

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.anuncio.id = res.id;
      this.anuncio.descricao = res.descricao;
      this.anuncio.titulo = res.titulo;
      this.anuncio.preco = res.preco;
      this.anuncio.userId = res.userId;
      this.anuncio.dataCadastro = res.dataCadastro;
      this.anuncio.isActive = res.isActive;
      this.anuncio.segunda = res.segunda;
      this.anuncio.terca = res.terca;
      this.anuncio.quarta = res.quarta;
      this.anuncio.quinta = res.quinta;
      this.anuncio.sexta = res.sexta;
      this.anuncio.sabado = res.sabado;
      this.anuncio.domingo = res.domingo;
      this.anuncio.horario1 = res.horario1;
      this.anuncio.horario2 = res.horario2;
      this.anuncio.horario3 = res.horario3;
      this.precoUnitario = res.preco;
      this.preco = res.preco;

      this.agenda.segunda = false;
      this.agenda.terca = false;
      this.agenda.quarta = false;
      this.agenda.quinta = false;
      this.agenda.sexta = false;
      this.agenda.sabado = false;
      this.agenda.domingo = false;

      this.usuarioService.findUserById(this.anuncio.userId).subscribe((response3) => {
        this.usuarioAnunciante = response3;
      },
        error => {
          console.log(error);
        });

      this.authService.getUser().then((val) => {

        this.email = val;
        this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

          this.usuario = response;

          this.petService.findByUserId(this.usuario.id).subscribe((response2) => {
            this.pets = response2;

            console.log(this.pets);
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


    });
  }

  ngOnInit() {

  }

  checkDays(event) {

    if (this.count > 1) {
      if (event.detail.checked === true) {
        this.preco = Number(this.preco) + Number(this.precoUnitario);
        this.count++;
      }
      if (event.detail.checked === false) {
        if (this.count !== 2) {
          this.preco = Number(this.preco) - Number(this.precoUnitario);
        }
        this.count--;
      }
    } else {
      this.count++;
    }

    console.log(this.count);
  }

  checkValue(event) {
    this.agenda.horario = event.detail.value;
  }

  checkPet(event) {
    this.agenda.petId = event.detail.value;
  }

  checkPayment(event) {
    this.agenda.formaPagamento = event.detail.value;
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

  cadastrarAgenda() {


    this.authService.getUser().then((val) => {

      this.email = val;

      this.agenda.clienteId = this.usuario.id;
      this.agenda.anuncianteId = this.anuncio.userId;
      this.agenda.anuncioId = this.anuncio.id;
      this.agenda.preco = String(this.preco);
      this.agendaService.save(this.agenda);
      console.log(this.agenda);

      this.agendaService.save(this.agenda)
        .subscribe((response2) => {
          this.msgReturn = 'SUCESSO';
          this.presentLoading();
          console.log(response2);
          this.presentAlert(response2);
        },
          error => {
            this.msgReturn = 'ERROR';
            this.presentLoading();
            this.presentAlert(error.error);
            console.log(error);
          });

    });
  }

}
