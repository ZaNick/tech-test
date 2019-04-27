import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { USER_STATUS } from 'src/app/constants/user-status';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  userForm: FormGroup;
  statuses = USER_STATUS;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _usersService: UsersService,
    private _fb: FormBuilder,
    private _config: ConfigService
  ) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      name: [this.data.name, Validators.required],
      fname: [this.data.fname, Validators.required],
      mname: [this.data.mname, Validators.required],
      status: this.data.status,
    });
  }

  onSaveClick() {
    this._usersService.updateUser(this.data.id, this.userForm.value)
      .pipe(first()).subscribe((res: User) => {
        if (res && res.id) {
          this.dialogRef.close(res);
        } else {
          this._config.showSnackBar$.next({message: 'Что-то пошло не так :( Попробуйте еще раз.'});
        }
      });
  }

}
