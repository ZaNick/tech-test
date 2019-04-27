import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'technokratos-test';

  constructor(
    private _config: ConfigService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._showSnackBar();
  }

  private _showSnackBar(): void {
    this._config.showSnackBar$
      .subscribe((evt: { message: string, action?: string, duration?: number }) => {
        this._snackBar.open(evt.message, evt.action || 'OK', { duration: evt.duration || 3000 });
      });
  }
}
