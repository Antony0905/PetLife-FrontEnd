import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { Anuncio } from 'src/models/anuncio';

@Injectable()
export class AnuncioService {

    constructor(public http: HttpClient) {

    }

    novoAnuncio(anuncio: Anuncio) {

        return this.http.post(`${API_CONFIG.baseUrl}/novoAnuncio`
            , anuncio);
    }

    atualizarAnuncio(anuncio: Anuncio) {

        return this.http.post(`${API_CONFIG.baseUrl}/novoAnuncio`
            , anuncio);
    }

    findAll(): Observable<Anuncio[]> {
        return this.http.get<Anuncio[]>(`${API_CONFIG.baseUrl}/getAnuncios`);
    }

    findByUserId(userId: string): Observable<Anuncio[]> {
        return this.http.get<Anuncio[]>(`${API_CONFIG.baseUrl}/getAnunciosByUserId/${userId}`);
    }

    deleteAnuncioById(id: string): Observable<string> {
        return this.http.get<string>(`${API_CONFIG.baseUrl}/deleteAnuncio/${id}`);
    }


}

