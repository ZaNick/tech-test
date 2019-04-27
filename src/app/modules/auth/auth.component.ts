import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  passInputType: 'text' | 'password' = 'password';
  authForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _config: ConfigService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.authForm = this._fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onToggleInputType() {
    this.passInputType = this.passInputType === 'text' ? 'password' : 'text';
  }

  onFormSubmit() {
    if (this.authForm.invalid) {
      this._config.showSnackBar$.next({ message: 'Все поля обязательны!' });
      return;
    }

    this._authService.login(this.authForm.value).subscribe(res => {
      console.log('res :', res);
      // const keys = res.headers.keys();
      // const headers = keys.map(key =>
      //   `${key}: ${res.headers.get(key)}`);

      // console.log({ keys, headers });
    }, err => {
      this._config.showSnackBar$.next({ message: 'Не верный логин или пароль' });
    });
  }

}
