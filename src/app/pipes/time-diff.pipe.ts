import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff',
  // pure: false
})
export class TimeDiffPipe implements PipeTransform {

  transform(value: string) {
    const d = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    return seconds;
  }
}
