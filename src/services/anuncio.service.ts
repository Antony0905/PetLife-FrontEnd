import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { Anuncio } from 'src/models/anuncio';
import { Observable } from 'rxjs';

@Injectable()
export class AnuncioService {

    constructor(public http: HttpClient) {

    }

    novoAnuncio(anuncio: Anuncio) {

        return this.http.post(`${API_CONFIG.baseUrl}/novoAnuncio`
            , anuncio,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

    findAll(): Observable<Anuncio[]> {
        return this.http.get<Anuncio[]>(`${API_CONFIG.baseUrl}/getAnuncios`
            ,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

}
