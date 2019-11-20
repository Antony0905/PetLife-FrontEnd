import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { PetImage } from '../models/pet.image';
import { UserImage } from '../models/user.image';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public http: HttpClient) {

  }

  saveImage(userImage: UserImage) {

    return this.http.post(`${API_CONFIG.baseUrl}/saveUserImage`
      , userImage);
  }

  findByUserId(userId: string): Observable<UserImage> {
    return this.http.get<UserImage>(`${API_CONFIG.baseUrl}/getUserImageByUserId/${userId}`);
  }

  savePetImage(petImage: PetImage) {

    return this.http.post(`${API_CONFIG.baseUrl}/savePetImage`
      , petImage);
  }

  findByPetId(petId: string): Observable<PetImage> {
    return this.http.get<PetImage>(`${API_CONFIG.baseUrl}/getPetImageByPetId/${petId}`);
  }

}
