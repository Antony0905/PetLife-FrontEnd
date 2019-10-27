import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { Anuncio } from 'src/models/anuncio';
import { Pet } from '../models/pet';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(public http: HttpClient) {

  }

  savePet(pet: Pet) {

    console.log(pet);
    return this.http.post(`${API_CONFIG.baseUrl}/savePet`
      , pet);
  }

  updatePet(pet: Pet) {

    return this.http.post(`${API_CONFIG.baseUrl}/savePet`
      , pet);
  }

  findAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${API_CONFIG.baseUrl}/getPets`);
  }

  findByUserId(userId: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${API_CONFIG.baseUrl}/getPetByUserId/${userId}`);
  }

  deletePetById(id: string): Observable<string> {
    return this.http.get<string>(`${API_CONFIG.baseUrl}/deletePet/${id}`);
  }

}
