import { Injectable } from '@angular/core';
import { AuthenticateResponse } from 'src/models/authenticate.response';

@Injectable()
export class GlobalParameters {

    constructor() { }

    private auth: AuthenticateResponse;

    getUsuarioLogado() {
        return this.auth;
    }

    setUsuarioLogado(usuario) {
        this.auth = usuario;
    }

    removeUsuarioLogado() {
        this.auth = null;
    }

}
