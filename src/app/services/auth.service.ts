import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { setToLocalStorage } from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _config: ConfigService
  ) { }

  login(body: { login: string, password: string }) {
    return this._http.post(`${this._config.apiUrl}/auth`, body, { observe: 'response' }).pipe(
      map(res => {
        const token = res.headers.get('authorization');
        setToLocalStorage('TOKEN', token);
        return res.body;
      })
    );
  }
}
