import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';

@Injectable()
export class CepService {
  resultado: Endereco;
  endereco: Endereco;
  constructor(private http: HttpClient) { }

  buscar(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
