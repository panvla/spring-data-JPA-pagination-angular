import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/api-response';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly serverUrl: string =  'http://localhost:8085';

  constructor(private http: HttpClient) { }

  // getUser(name: string = '', page:number = 0, size: number = 10): Observable<any> {
  //   return this.http.get<any>(`${this.serverUrl}/user?name=${name}&page=${page}&size=${size}`);
  // }

  users$ = (name: string = ' ', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> =>
  this.http.get<ApiResponse<Page>>(`${this.serverUrl}/user?name=${name}&page=${page}&size=${size}`);
}
