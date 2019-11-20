import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { Anuncio } from 'src/models/anuncio';
import { Pet } from '../models/pet';
import { Comentario } from '../models/comentario';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(public http: HttpClient) {

  }

  findByUserId(userId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${API_CONFIG.baseUrl}/getComentariosByUserId/${userId}`);
  }

}
