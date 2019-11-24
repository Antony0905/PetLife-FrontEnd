import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AnuncioService } from 'src/services/anuncio.service';
import { Pet } from '../models/pet';
import { AuthenticationService } from '../services/authentication.service';
import { PetService } from '../services/pet-service.service';
import { RouterPage } from '../services/abstract-router-page';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageService } from '../services/image.service';
import { PetImage } from '../models/pet.image';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-update-pet',
  templateUrl: './view-update-pet.page.html',
  styleUrls: ['./view-update-pet.page.scss'],
})
export class ViewUpdatePetPage extends RouterPage implements OnDestroy {

  pet = new Pet();
  showEdit = false;

  msgReturn: string;
  email: string;

  dogsBreed = true;
  numbers = new Array();

  files: Observable<any[]>;
  petImage = new PetImage();
  petImageSave = new PetImage();
  public AtpetGroup: FormGroup;


  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public anuncioService: AnuncioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public petService: PetService,
    private router: Router,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private AtpetBuilder: FormBuilder
  ) {
    super(router, route);
    this.AtpetGroup = this.AtpetBuilder.group({

      'nome': [this.pet.nome, Validators.compose([
        Validators.required
      ])],
      'idade': [this.pet.idade, Validators.compose([
        Validators.required])],
      'peso': [this.pet.peso, Validators.compose([
        Validators.required])],
      'Raca': [this.pet.raca, Validators.compose([
        Validators.required])],
      'tipo': [this.pet.petType, null],
      'descricao': [this.pet.descricao, null],
    });
  }

  onEnter() {
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

      this.imageService.findByPetId(this.pet.id).subscribe(res2 => {
        this.petImage = res2;
      });

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
          this.presentAlert('Ocorreu erro ao atualizar o Pet. Por favor tente novamente mais tarde.');
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
    this.onEnter();
  }

  deletePet(id: string) {
    this.petService.deletePetById(id).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlertDelete('Pet excluído com sucesso!');
      this.onEnter();
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao excluir o Pet. Por favor tente novamente mais tarde.');
      });
  }

  changeSelectBreeds(event) {

    if ('Cachorro' === event.detail.value) {
      this.dogsBreed = true;
    } else {
      this.dogsBreed = false;
    }

  }

  onDestroy() {
    super.ngOnDestroy();
  }

  PickFileAndGetBase64String() {
    this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((nativepath) => {
        this.base64.encodeFile(nativepath).then((base64string) => {

          this.petImageSave.petId = this.pet.id;
          this.petImageSave.base64 = base64string;

          this.imageService.savePetImage(this.petImageSave).subscribe(res => {
            this.msgReturn = 'SUCESSO';
            this.presentLoadingPhotoProfile();
            console.log(res);
            this.presentAlertPhotoProfile('Foto do Pet atualizada com sucesso.');
          },
            error => {
              this.msgReturn = 'ERROR';
              this.presentLoadingPhotoProfile();
              this.presentAlert('Ocorreu erro ao atualizar foto do Pet. Por favor tente novamente mais tarde.');
              console.log(error);
            });
        });
      });
    });

  }

  async presentLoadingPhotoProfile() {
    const loading = await this.loadingController.create({
      message: 'Atualizando foto do Pet',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentAlertPhotoProfile(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/update-pet-profile'], {
            queryParams: this.pet
          });
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }



}
