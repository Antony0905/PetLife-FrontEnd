import { Injectable } from '@angular/core';
import { AuthenticateResponse } from 'src/models/authenticate.response';

@Injectable()
export class GlobalParameters {

    constructor() { }

    public auth: AuthenticateResponse;

    public getUsuarioLogado() {
        return this.auth;
    }

    public setUsuarioLogado(usuario) {
        this.auth = usuario;
    }

    public removeUsuarioLogado() {
        this.auth = null;
    }

}
