import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { UsuarioDTO } from 'src/models/usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient) {

    }

    registrar(user: UsuarioDTO) {

        return this.http.post(`${API_CONFIG.baseUrl}/registrar`
            , user,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

}
