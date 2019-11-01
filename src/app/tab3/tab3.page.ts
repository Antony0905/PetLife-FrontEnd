import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { Pet } from '../models/pet';
import { AuthenticationService } from '../services/authentication.service';
import { PetService } from '../services/pet-service.service';
import { RouterPage } from '../services/abstract-router-page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends RouterPage implements OnDestroy {

  constructor(
    public navCtrl: NavController,
    public petService: PetService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(router, route);

  }

  pets: Pet[];
  email: string;
  usuario: UsuarioDTO;

  pageServicos() {
    this.navCtrl.navigateForward('register-pet');
  }

  onEnter() {

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

  onDestroy() {
    super.ngOnDestroy();
  }

}
