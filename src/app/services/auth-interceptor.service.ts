import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getFromLocalStorage } from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private _config: ConfigService,
    private _router: Router) {
  }

  /**
  * Intercept an outgoing http request and optionally transform it or the response.
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = getFromLocalStorage('TOKEN');
    if (req.url.indexOf(this._config.apiUrl) !== -1 && auth) {
      req = req.clone({
        setHeaders: {
          Authorization: `${auth}`
        }
      });
      return this.handleRequest(req, next);
    }
    return next.handle(req);
  }

  /**
  * Handle each request for api and set Authorization header if logged in
  */
  private handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            // TODO something with response if needed
          }
          return evt;
        },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                this._router.navigate(['auth']);
              }
            }
          })
      );
  }
}
