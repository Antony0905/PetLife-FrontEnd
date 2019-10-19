import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { Pet } from '../models/pet';
import { AuthenticationService } from '../services/authentication.service';
import { PetService } from '../services/pet-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public navCtrl: NavController,
    public petService: PetService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    private router: Router
  ) {

  }

  pets: Pet[];
  email: string;
  usuario: UsuarioDTO;

  pageServicos() {
    this.navCtrl.navigateForward('register-pet');
  }

  ionViewWillEnter() {

    this.authService.getUser().then((val) => {

      this.email = val;
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;

        this.petService.findByUserId(this.usuario.id).subscribe((response2) => {
          this.pets = response2;
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

  viewOrUpdatePet(pet: Pet) {
    console.log(pet);
    this.router.navigate(['/view-update-pet'], {
      queryParams: pet
    });
  }

}
