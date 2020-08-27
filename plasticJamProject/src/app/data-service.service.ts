import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './user';
import { UsersStat } from './api-stat-interface';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  name;
  private apiUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) { }


  set userName(value) {
    this.name = value;
  }

  get getuserName() {
    return this.name;
  }

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

}
