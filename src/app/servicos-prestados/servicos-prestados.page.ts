import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../services/agenda.service';
import { UsuarioService } from 'src/services/usuario.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Agenda } from 'src/models/agenda';
import { UsuarioDTO } from 'src/models/usuario.dto';

@Component({
  selector: 'app-servicos-prestados',
  templateUrl: './servicos-prestados.page.html',
  styleUrls: ['./servicos-prestados.page.scss'],
})
export class ServicosPrestadosPage implements OnInit {

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

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getUser().then((val) => {

      this.email = val;
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;

        this.agendaService.findByAnuncianteId(this.usuario.id).subscribe((response2) => {
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
    this.router.navigate(['/view-servicos-prestados'], {
      queryParams: agenda
    });
  }

}
