import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { Authenticate } from 'src/models/authenticate';
import { AuthenticateResponse } from 'src/models/authenticate.response';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateService {

    constructor(public http: HttpClient) {

    }

    autenticar(auth: Authenticate): Observable<AuthenticateResponse[]> {
        return this.http.post<AuthenticateResponse[]>(`${API_CONFIG.baseUrl}/authentication/login`
            , auth,
            {
                headers: new HttpHeaders({
                    'content-Type': 'application/json'
                })
            });
    }

}
