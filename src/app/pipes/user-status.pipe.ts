import { Pipe, PipeTransform } from '@angular/core';
import { USER_STATUS } from '../constants/user-status';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(value: number): any {
    return USER_STATUS[value];
  }

}
