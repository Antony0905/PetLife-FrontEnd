import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Agenda } from 'src/models/agenda';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { AnuncioService } from 'src/services/anuncio.service';
import { UsuarioService } from 'src/services/usuario.service';
import { Pet } from '../models/pet';
import { ModfinalizarPage } from '../modfinalizar/modfinalizar.page';
import { ModrelatarproblemaPage } from '../modrelatarproblema/modrelatarproblema.page';
import { AgendaService } from '../services/agenda.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-view-servicos-contratados',
  templateUrl: './view-servicos-contratados.page.html',
  styleUrls: ['./view-servicos-contratados.page.scss'],
})
export class ViewServicosContratadosPage implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public agendaService: AgendaService,
    public router: Router,
    public usuarioService: UsuarioService,
    private modalCtrl: ModalController
  ) { }

  agenda = new Agenda();
  msgReturn: string;
  pet = new Pet();
  anunciante = new UsuarioDTO();
  cliente = new UsuarioDTO();

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.agenda.id = res.id;
      this.agenda.anuncianteId = res.anuncianteId;
      this.agenda.anuncioId = res.anuncioId;
      this.agenda.clienteId = res.clienteId;
      this.agenda.data = res.data;
      this.agenda.dataCadastro = res.dataCadastro;
      this.agenda.formaPagamento = res.formaPagamento;
      this.agenda.horario = res.horario;
      this.agenda.petId = res.petId;
      this.agenda.preco = res.preco;
      this.agenda.userNameAnuncio = res.userNameAnuncio;
      this.agenda.isActive = res.isActive;
      this.agenda.serviceName = res.serviceName;

      this.usuarioService.findUserAndPetById(this.agenda.anuncianteId, this.agenda.petId, this.agenda.clienteId).subscribe(res2 => {

        this.pet = res2.pet;
        this.anunciante = res2.anunciante;
        this.cliente = res2.cliente;

      },
        error => {
          console.log(error);
        });

    });

  }

  async showModalFinalizar() {
    const modal = await this.modalCtrl.create({
      component: ModfinalizarPage,
      componentProps: {
        anunciante: this.anunciante,
        agenda: this.agenda
      }
    });
    modal.present();
  }

  async showModalRelatarProblema() {
    const modal = await this.modalCtrl.create({
      component: ModrelatarproblemaPage,
      componentProps: {
        userReported: this.anunciante,
        userReporter: this.cliente,
        agenda: this.agenda
      }
    });
    modal.present();
  }

  viewProfile() {

    this.router.navigate(['/view-profile'], {
      queryParams: this.anunciante
    });
  }

}
