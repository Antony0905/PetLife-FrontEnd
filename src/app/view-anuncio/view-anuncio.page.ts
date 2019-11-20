import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { RouterPage } from '../services/abstract-router-page';
import { WeekService } from '../services/week-service';
import { Week } from '../models/week';

@Component({
  selector: 'app-view-anuncio',
  templateUrl: './view-anuncio.page.html',
  styleUrls: ['./view-anuncio.page.scss'],
})
export class ViewAnuncioPage extends RouterPage implements OnDestroy {

  constructor(
    public activatedRoute: ActivatedRoute,
    public agendaService: AgendaService,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public petService: PetService,
    private router: Router,
    private route: ActivatedRoute,
    private weekService: WeekService,
  ) {
    super(router, route);
  }

  anuncio = new Anuncio();
  agenda = new Agenda();
  week = new Week();
  usuario = new UsuarioDTO();
  usuarioAnunciante = new UsuarioDTO();
  preco = 0;
  precoUnitario;
  count = 1;
  horario: string;
  email;
  msgReturn;
  pets: Pet[];

  public disponibleDays: any[] = [
    { day: 'sunday', isActive: false, date: '' },
    { day: 'monday', isActive: false, date: '' },
    { day: 'tuesday', isActive: false, date: '' },
    { day: 'wednesday', isActive: false, date: '' },
    { day: 'thursday', isActive: false, date: '' },
    { day: 'friday', isActive: false, date: '' },
    { day: 'saturday', isActive: false, date: '' },
  ];

  onEnter() {


    this.weekService.getCurrentWeek().subscribe((response4) => {
      this.week = response4;

      this.disponibleDays[0].date = this.week.sunday;
      this.disponibleDays[1].date = this.week.monday;
      this.disponibleDays[2].date = this.week.tuesday;
      this.disponibleDays[3].date = this.week.wednesday;
      this.disponibleDays[4].date = this.week.thursday;
      this.disponibleDays[5].date = this.week.friday;
      this.disponibleDays[6].date = this.week.saturday;

      console.log(this.disponibleDays);
    });

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
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['tabs/tabs/tab1']);
        }
      }]
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
      this.agenda.preco = String(this.precoUnitario);
      this.agenda.userNameAnuncio = this.usuarioAnunciante.nome;
      this.agenda.userNameCliente = this.usuario.nome;
      this.agenda.serviceName = this.anuncio.titulo;

      for (const x of this.disponibleDays) {

        if (x.isActive === true) {
          this.agenda.data = x.date;

          this.agendaService.save(this.agenda)
            .subscribe((response2) => {
              this.msgReturn = 'SUCESSO';
              this.presentLoading();
              this.presentAlert('Agendamento realizado com sucesso : ' + x.date + ' às ' + this.agenda.horario +
                'hrs. Aguarde o profissional na data marcada');
            },
              error => {
                this.msgReturn = 'ERROR';
                this.presentLoading();
                this.presentAlert('Ocorreu erro ao finalizar o agendamento. Por favor tente novamente mais tarde.');
                console.log(error);
              });
        }
      }
    });
  }

  onDestroy() {
    super.ngOnDestroy();
  }

  viewProfile() {
    this.router.navigate(['/view-profile'], {
      queryParams: this.usuarioAnunciante
    });
  }

}
