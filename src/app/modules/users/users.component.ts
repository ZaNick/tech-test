import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { first, mergeMap, tap, delay, repeat, filter, take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { ConfigService } from 'src/app/services/config.service';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  usersOrderMap: number[] = [];
  users: User[] = [];
  dataWasGetted = false;
  sendingRequest = false;
  _updUsers: Subscription;

  constructor(
    private _usersService: UsersService,
    public config: ConfigService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscribeToUsersUpdate();
  }

  ngOnDestroy() {
    this._updUsers.unsubscribe();
  }

  private subscribeToUsersUpdate() {
    this._updUsers = this._usersService.getUsers().pipe(delay(3000), repeat())
      .subscribe((res: User[]) => {
        console.log('users was getted', res);
        if (!Array.isArray(res)) {
          return;
        }
        if (!this.usersOrderMap.length) {
          this.users = res;
          this.usersOrderMap = res.map(user => user.id);
          this.dataWasGetted = true;
        } else {
          this.sortUsers(res);
        }
      }, err => {
      });
  }

  sortUsers(users: User[]) {
    this.users = this.usersOrderMap.map(mapId => users.find(user => user.id === mapId));
  }

  onUserClick(user: User) {
    this._updUsers.unsubscribe();
    this._dialog.open(EditUserDialogComponent, {
      data: user,
      width: '900px'
    }).afterClosed().pipe(first()).subscribe((userUpdated: User) => {
      const i = this.users.findIndex(usr => usr.id === userUpdated.id);
      this.users[i] = userUpdated;
      // this.subscribeToUsersUpdate();
    });
  }

}
