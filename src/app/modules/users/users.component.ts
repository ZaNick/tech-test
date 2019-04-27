import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { first, delay, repeat, filter, take, map } from 'rxjs/operators';
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
  currentTab = 0;
  dataWasGetted = false;
  sendingRequest = false;
  showPreloader = true;
  users: User[] = [];
  usersOrderMap: number[] = [];
  private _updUsers: Subscription;

  tabsList = [
    { text: 'Все', status: null },
    { text: 'Заблокированные', status: 2 },
    { text: 'Активные', status: 0 },
  ];

  constructor(
    private _usersService: UsersService,
    public config: ConfigService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscribeToUsersUpdate();
  }

  ngOnDestroy() {
    this.clearSubscription();
  }

  private subscribeToUsersUpdate(status = null) {
    this.clearSubscription();
    this._updUsers = this._usersService.getUsers(status).pipe(
      map((res: User[]) => {
        if (!Array.isArray(res)) {
          if (!this.users.length) {
            this.config.showSnackBar$.next({ message: 'Ошибка! Повторная попытка...' });
          }
          return;
        }
        if (!this.usersOrderMap.length) {
          this.showPreloader = false;
          this.users = res;
          this.usersOrderMap = res.map(user => user.id);
          this.dataWasGetted = true;
        } else {
          this.sortUsers(res);
        }
      }),
      delay(5000),
      repeat()
    ).subscribe(() => {}, err => {
      this.config.showSnackBar$.next({ message: 'Ошибка!' });
      this._updUsers.unsubscribe();
    });
  }

  clearSubscription() {
    if (this._updUsers && !this._updUsers.closed) {
      this._updUsers.unsubscribe();
    }
  }

  sortUsers(users: User[]) {
    const newUsersMap = users.map(user => user.id);
    if (!this._isSameArrays(newUsersMap, this.usersOrderMap)) {
      this.usersOrderMap = newUsersMap;
    }
    this.users = this.usersOrderMap.map(mapId => users.find(user => user.id === mapId));
  }

  private _isSameArrays(array1: any[], array2: any[]) {
    array1 = [...array1].sort();
    array2 = [...array2].sort();
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }

  onUserClick(user: User) {
    this.clearSubscription();
    this._dialog.open(EditUserDialogComponent, {
      data: user,
      width: '900px'
    }).afterClosed().pipe(first()).subscribe((userUpdated: User) => {
      if (userUpdated) {
        const i = this.users.findIndex(usr => usr.id === userUpdated.id);
        this.users[i] = userUpdated;
      }
      this.subscribeToUsersUpdate();
    });
  }

  onTabClick(index: number, status) {
    if (this.currentTab !== index) {
      this.currentTab = index;
      this.showPreloader = true;
      this.users = [];
      this.usersOrderMap = [];
      this.dataWasGetted = false;
      this.subscribeToUsersUpdate(status);
    }
  }

}
