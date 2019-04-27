import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ConfigService } from './services/config.service';
import { MatSnackBar } from '@angular/material';
import { switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  snackBarData: any;
  @ViewChild('snackBarTemplate') snackBarTemplate: TemplateRef<any>;

  constructor(
    private _config: ConfigService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._showSnackBar();
  }

  private _showSnackBar(): void {
    this._config.showSnackBar$.subscribe(res => {
      console.log('res :', res);
      this.snackBarData = res;
      this._snackBar.openFromTemplate(this.snackBarTemplate, {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        // duration: res.duration || 3000
      });
    });
  }

  dismissSnackbar(): void {
    this._snackBar.dismiss();
  }

  test(success) {
    this._config.showSnackBar$.next({ message: 'hui', success });
  }
}

