import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { Observable } from 'rxjs';
import { AnunciantePet } from 'src/app/models/user.pet';

@Injectable()
export class UsuarioService {



    findUserAndPetById(anuncianteId: string, petId: string, clienteId: string): Observable<AnunciantePet> {
        return this.http.get<AnunciantePet>(`${API_CONFIG.baseUrl}/findUserAndPetById/${anuncianteId}/${petId}/${clienteId}`);
    }

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

    update(user: UsuarioDTO) {

        return this.http.post(`${API_CONFIG.baseUrl}/update`
            , user,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

    findUserByEmail(email: string): Observable<UsuarioDTO> {
        return this.http.post<UsuarioDTO>(`${API_CONFIG.baseUrl}/findUserByEmail`
            ,
            email,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

    findUserById(userId: string): Observable<UsuarioDTO> {
        return this.http.post<UsuarioDTO>(`${API_CONFIG.baseUrl}/findUserById`
            ,
            userId,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

    findUser(email: string): Observable<UsuarioDTO> {
        return this.findUserByEmail(email);
    }

}
