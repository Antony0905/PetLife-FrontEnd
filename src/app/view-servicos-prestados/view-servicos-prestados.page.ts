import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AnuncioService } from 'src/services/anuncio.service';
import { AuthenticationService } from '../services/authentication.service';
import { AgendaService } from '../services/agenda.service';
import { UsuarioService } from 'src/services/usuario.service';
import { Agenda } from 'src/models/agenda';
import { Pet } from '../models/pet';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { ModrelatarproblemaPage } from '../modrelatarproblema/modrelatarproblema.page';

@Component({
  selector: 'app-view-servicos-prestados',
  templateUrl: './view-servicos-prestados.page.html',
  styleUrls: ['./view-servicos-prestados.page.scss'],
})
export class ViewServicosPrestadosPage implements OnInit {

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

  async showModalRelatarProblema() {
    const modal = await this.modalCtrl.create({
      component: ModrelatarproblemaPage,
      componentProps: {
        userReported: this.cliente,
        userReporter: this.anunciante,
        agenda: this.agenda
      }
    });
    modal.present();
  }

  viewProfile() {

    this.router.navigate(['/view-profile'], {
      queryParams: this.cliente
    });
  }

}
