import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';
const USER_EMAIL = 'user-email-logged';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userEmail: string;

  authenticateState = new BehaviorSubject(false);
  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(userEmail: string) {

    this.storage.set(USER_EMAIL, userEmail);
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticateState.next(true);
    });
  }


  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticateState.next(false);
    });
  }

  isAuthenticated() {
    console.log('Usuario Autenticado? ' + this.authenticateState.value);
    return this.authenticateState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {

      if (res) {
        this.authenticateState.next(true);
      }
    });
  }

  async getUser() {
    return await this.storage.get(USER_EMAIL);
  }


}
