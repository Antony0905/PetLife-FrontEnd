import { Component, OnInit, Input } from '@angular/core';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { Agenda } from 'src/models/agenda';
import { EndServiceDTO } from '../models/end.service.dto';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AgendaService } from '../services/agenda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modfinalizar',
  templateUrl: './modfinalizar.page.html',
  styleUrls: ['./modfinalizar.page.scss'],
})
export class ModfinalizarPage implements OnInit {

  @Input() anunciante: UsuarioDTO;
  @Input() agenda: Agenda;
  msgReturn: string;
  service = new EndServiceDTO();

  constructor(
    private modalCtrl: ModalController,
    private agendaService: AgendaService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.anunciante);
    console.log(this.agenda);

  }

  finalizar() {

    this.service.agendaId = this.agenda.id;
    this.service.anuncianteId = this.anunciante.id;

    console.log('comentario: ' + this.service.comentario);
    this.agendaService.finalizarAnuncio(this.service).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlert('Serviço finalizado com sucesso. Agradecemos pela sua confiança.');
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao finalizar o serviço. Por favor tente novamente mais tarde.');
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
          this.router.navigate(['/servicos-contratados']);
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
