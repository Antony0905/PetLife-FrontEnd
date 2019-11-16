import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { Agenda } from 'src/models/agenda';
import { EndServiceDTO } from '../models/end.service.dto';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    public http: HttpClient
  ) { }

  save(agenda: Agenda) {
    return this.http.post(`${API_CONFIG.baseUrl}/saveAgenda`
      , agenda);
  }

  findByClienteId(clienteId: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}/getAgendaByUserId/${clienteId}`);
  }

  findByAnuncianteId(clienteId: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}/getAgendaByAnuncianteId/${clienteId}`);
  }

  finalizarAnuncio(service: EndServiceDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/finalizarAnuncio`
      , service);
  }

}
