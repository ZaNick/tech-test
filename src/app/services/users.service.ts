import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient,
    private _config: ConfigService
  ) { }

  getUsers(type?: number) {
    const params: any = {};
    if (type) {
      params.type = type;
    }
    return this._http.get(`${this._config.apiUrl}/users`, { params });
  }

  updateUser(id: number, body: any) {
    return this._http.patch(`${this._config.apiUrl}/users/${id}`, body);
  }
}
