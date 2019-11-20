import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { Agenda } from 'src/models/agenda';
import { EndServiceDTO } from '../models/end.service.dto';
import { AgendaService } from '../services/agenda.service';
import { Router } from '@angular/router';
import { SuporteService } from 'src/services/suporte.service';

@Component({
  selector: 'app-modrelatarproblema',
  templateUrl: './modrelatarproblema.page.html',
  styleUrls: ['./modrelatarproblema.page.scss'],
})
export class ModrelatarproblemaPage implements OnInit {

  @Input() userReporter: UsuarioDTO;
  @Input() agenda: Agenda;
  @Input() userReported: UsuarioDTO;

  msgReturn: string;
  service = new EndServiceDTO();
  userNameReported: string;

  constructor(
    private modalCtrl: ModalController,
    private suporteService: SuporteService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {

    this.userNameReported = this.userReported.nome;

  }

  relatar() {

    this.service.agendaId = this.agenda.id;
    this.service.userReported = this.userReported.email;
    this.service.userReporter = this.userReporter.email;

    console.log('comentario: ' + this.service.comentario);
    this.suporteService.relatarProblema(this.service).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlert('Problema reportado com sucesso. Responderemos o mais breve possível por email. Obrigado pela compreensão.');
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao reportar o problema. Por favor tente novamente mais tarde.');
      });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentAlert(mensagem, param?) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.close();
          this.router.navigate(['/tabs/tabs/tab4']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }



}
