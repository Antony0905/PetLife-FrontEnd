import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../services/agenda.service';
import { Agenda } from 'src/models/agenda';
import { UsuarioService } from 'src/services/usuario.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from 'src/models/usuario.dto';

@Component({
  selector: 'app-servicos-contratados',
  templateUrl: './servicos-contratados.page.html',
  styleUrls: ['./servicos-contratados.page.scss'],
})
export class ServicosContratadosPage implements OnInit {

  constructor(
    private agendaService: AgendaService,
    private usaurioService: UsuarioService,
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  agendas: Agenda[];
  email;
  usuario = new UsuarioDTO();
  showServices = 'andamento';

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getUser().then((val) => {

      this.email = val;
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;

        this.agendaService.findByClienteId(this.usuario.id).subscribe((response2) => {
          this.agendas = response2;
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

  viewServico(agenda: Agenda) {
    console.log(agenda);
    this.router.navigate(['/view-servicos-contratados'], {
      queryParams: agenda
    });
  }

  changeSelected(event) {

    if ('todos' === event.detail.value) {
      this.showServices = 'todos';
    } else if ('concluido' === event.detail.value) {
      this.showServices = 'concluido';
    } else {
      this.showServices = 'andamento';
    }

  }

}
