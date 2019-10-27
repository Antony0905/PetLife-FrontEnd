import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agenda } from 'src/models/agenda';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    public http: HttpClient
  ) { }

  save(agenda: Agenda) {

    console.log('Salvando Agenda' + agenda);
    return this.http.post(`${API_CONFIG.baseUrl}/saveAgenda`
      , agenda);
  }

}
