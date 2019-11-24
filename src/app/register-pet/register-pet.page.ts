import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { Pet } from '../models/pet';
import { PetService } from '../services/pet-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.page.html',
  styleUrls: ['./register-pet.page.scss'],
})
export class RegisterPetPage implements OnInit {

  pet = new Pet();
  msgReturn = '';
  dataFromService: any = '';
  user = new UsuarioDTO();
  email: string;
  usuario = new UsuarioDTO();
  numbers = new Array();
  dogsBreed = true;
  public PetGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public petService: PetService,
    public authService: AuthenticationService,
    private router: Router,
    private PetBuilder: FormBuilder
  ) {

    for (let index = 0; index <= 50; index++) {
      this.numbers.push(index);
    }

    this.pet.petType = 'Cachorro';
    this.pet.raca = 'Outros';

    this.PetGroup = this.PetBuilder.group({

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

  ngOnInit() {
  }

  registrar() {


    this.authService.getUser().then((val) => {

      this.email = val;
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;
        this.pet.userId = this.usuario.id;

        this.petService.savePet(this.pet)
          .subscribe((response2) => {
            this.msgReturn = 'SUCESSO';
            this.dataFromService = JSON.stringify(response2);
            this.presentLoading();
            this.presentAlert(response2);
          },
            error => {
              this.msgReturn = 'ERROR';
              this.presentLoading();
              this.presentAlert('Ocorreu erro ao registrar o Pet. Por favor tente novamente mais tarde.');
            });
      },
        error => {
          console.log(error);
          return null;
        });
    });

  }

  async presentAlert(mensagem) {
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
      message: 'Registrando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }




  changeSelectBreeds(event) {

    if ('Cachorro' === event.detail.value) {
      this.dogsBreed = true;
    } else {
      this.dogsBreed = false;
    }

  }

}
