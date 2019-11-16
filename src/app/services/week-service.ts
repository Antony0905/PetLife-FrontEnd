import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { Week } from '../models/week';


@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor(public http: HttpClient) {

  }

  getCurrentWeek(): Observable<Week> {
    return this.http.get<Week>(`${API_CONFIG.baseUrl}/getCurrentWeek`);
  }

}
