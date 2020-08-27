import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './user';
import { UsersStat } from './api-stat-interface';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private apiUrl = 'http://localhost:3001/api/users';
  private detailUrl = `http://localhost:3001/api/statistics/`;

  constructor(private http: HttpClient) { }

  getDb(x): Observable<Users> {
    const params = new HttpParams({
      fromObject:
      {
        page: x,
        limit: '50'
      }
    });
    return this.http.get<Users>(this.apiUrl, { params: params });
  }

  getUserDetail(idx): Observable<UsersStat> {
    return this.http.get<UsersStat>(`${this.detailUrl}${idx}`);
  }

}
