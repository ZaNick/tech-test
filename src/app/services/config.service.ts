import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl = environment.apiUrl;
  frontUrl = environment.front;
  showSnackBar$ = new Subject<{ message: string, action?: string, duration?: number }>();
}
