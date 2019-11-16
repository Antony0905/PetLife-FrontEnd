import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndServiceDTO } from 'src/app/models/end.service.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class SuporteService {

    constructor(public http: HttpClient) {

    }

    relatarProblema(service: EndServiceDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/relatarProblema`
            , service);
    }

}
