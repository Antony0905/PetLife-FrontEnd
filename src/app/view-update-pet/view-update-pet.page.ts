import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AnuncioService } from 'src/services/anuncio.service';
import { Pet } from '../models/pet';
import { AuthenticationService } from '../services/authentication.service';
import { PetService } from '../services/pet-service.service';

@Component({
  selector: 'app-view-update-pet',
  templateUrl: './view-update-pet.page.html',
  styleUrls: ['./view-update-pet.page.scss'],
})
export class ViewUpdatePetPage implements OnInit {

  pet = new Pet();
  showEdit = false;

  msgReturn: string;
  email: string;

  dogsBreed = true;
  numbers = new Array();

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public petService: PetService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.pet.id = res.id;
      this.pet.userId = res.userId;
      this.pet.descricao = res.descricao;
      this.pet.nome = res.nome;
      this.pet.idade = res.idade;
      this.pet.peso = res.peso;
      this.pet.raca = res.raca;
      this.pet.descricao = res.descricao;
      this.pet.petType = res.petType;
      for (let index = 0; index <= 50; index++) {
        this.numbers.push(index);
      }
    });
  }


  atualizarPet() {
    this.petService.updatePet(this.pet)
      .subscribe((response2) => {
        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        this.presentAlert('Pet atualizado com sucesso!', this.pet);
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert(error.error);
        });
  }

  async presentAlert(mensagem, param?) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.showEdit = false;
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentAlertDelete(mensagem, param?) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['tabs/tabs/tab3']);
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


  showEditView() {
    this.showEdit = true;
  }

  dismissEditView() {
    this.showEdit = false;
    this.ionViewWillEnter();
  }

  deletePet(id: string) {
    this.petService.deletePetById(id).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlertDelete('Pet excluído com sucesso!');
      this.ionViewWillEnter();
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert(error.error);
      });
  }

  changeSelectBreeds(event) {

    if ('Cachorro' === event.detail.value) {
      this.dogsBreed = true;
    } else {
      this.dogsBreed = false;
    }

  }

}
